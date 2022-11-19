import { Form, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import commontApi from "../../api/common";
import riceApi from "../../api/price";

type Props = {
  Key: string;
  Value: string;
  onSelect?: (values: any) => void;
  placeholder?: string;
  name?: string;
  lable?: string;
  type?: string;
  keyword?: string;
  returnName?: boolean;
  disabled?: boolean;
};
const { Option } = Select;

const AutoComplete = ({
  Key,
  Value,
  onSelect,
  placeholder,
  name,
  lable,
  type = "",
  keyword = "search",
  returnName = false,
  disabled = false,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchData, setSearchData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>("");
  const timer = useRef<any>();

  useEffect(() => {
    (() => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(async () => {
        setLoading(true);
        const params: any = {};
        params[keyword] = searchValue;

        try {
          console.log(type);

          const res = await commontApi.autoComplete(type, {
            search: searchValue,
          });
          setSearchData(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    })();

    return () => clearTimeout(timer.current);
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (value: string) => {
    setSelectValue(value);
    if (onSelect) {
      if (returnName) {
        if (searchData && searchData.length > 0) {
          const name = searchData.find((item: any) => item[Key] === value);
          onSelect(name);
        }
      } else {
        onSelect(value);
      }
    }
  };

  const handleChange = (value: string) => {
    setSelectValue(value);
  };

  const children =
    searchData &&
    searchData.length > 0 &&
    searchData?.map((item: any) => {
      return (
        <Option key={item[Key]} value={item[Key]}>
          {item[Value]}
        </Option>
      );
    });

  const selectC = (
    <Select
      allowClear
      placeholder={placeholder || "Tìm kiếm"}
      showSearch
      onSearch={handleSearch}
      filterOption={false}
      onSelect={handleSelect}
      onChange={handleChange}
      disabled={disabled}
    >
      {children?.length > 0 && !loading && children}
      {loading && (
        <Option>
          <Spin size="small"></Spin>
        </Option>
      )}
    </Select>
  );

  return name ? (
    <Form.Item
      name={name || Key}
      label={lable || " "}
      rules={[
        {
          required: true,
        },
      ]}
    >
      {selectC}
    </Form.Item>
  ) : (
    selectC
  );
};

export default AutoComplete;

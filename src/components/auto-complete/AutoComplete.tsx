import { Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import riceApi from "../../api/price";

type Props = {
  Key: string;
  Value: string;
  onSelect: Function;
  placeholder?: string;
};
const { Option } = Select;
const AutoComplete = ({ Key, Value, onSelect, placeholder }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchData, setSearchData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const timer = useRef<number>();

  useEffect(() => {
    (() => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(async () => {
        setLoading(true);
        const params = {
          name_gionglua: searchValue,
        };
        try {
          const res = await riceApi.autoCompleteRice(params);
          setSearchData(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 800);
    })();

    return () => clearTimeout(timer.current);
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <>
      <Select
        placeholder={placeholder || "Search"}
        showSearch
        onSearch={handleSearch}
        filterOption={false}
        loading={loading}
        onSelect={handleSelect}
      >
        {searchData &&
          !loading &&
          searchData.length > 0 &&
          searchData?.map((item: any) => {
            return (
              <Option key={item[Key]} value={item[Key]}>
                {item[Value]}
              </Option>
            );
          })}
        {loading && (
          <Option>
            <Spin size="small"></Spin>
          </Option>
        )}
      </Select>
    </>
  );
};

export default AutoComplete;

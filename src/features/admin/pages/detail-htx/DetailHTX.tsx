import { useQuery } from "@tanstack/react-query";
import { DatePicker, Input, Spin } from "antd";
import React from "react";
import htxApi from "../../../../api/htx";
import FormComponent from "../../../../components/form-component/FormComponent";
import { convertToMoment } from "../../../../utils/convertToMoment";

type Props = {};

const DetailHTX = (props: Props) => {
  const detailHTXForm = [
    {
      name: "id_hoptacxa",
      label: "ID",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input disabled placeholder="Họ tên"></Input>,
    },
    {
      name: "name_hoptacxa",
      label: "Tên hợp tác xã",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input placeholder="Tên hợp tác xã"></Input>,
    },
    {
      name: "email",
      label: "Email",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input placeholder="Email"></Input>,
    },
    {
      name: "phone_number",
      label: "Số điện thoại",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input placeholder="Số điện thoại"></Input>,
    },
    {
      name: "created_at",
      label: "Ngày tạo",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: (
        <DatePicker disabled placeholder="Ngày tạo" style={{ width: "100%" }} />
      ),
    },
    {
      name: "chunhiem_name",
      label: "Tên chủ nhiệm",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input disabled placeholder="Tên chủ nhiệm"></Input>,
    },
    {
      name: "chunhiem_phone_number",
      label: "Số điện thoại chủ nhiệm",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: (
        <Input disabled placeholder="Số điện thoại chủ nhiệm"></Input>
      ),
    },
    {
      name: "chunhiem_email",
      label: "Email chủ nhiệm",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input disabled placeholder="Email chủ nhiệm"></Input>,
    },

    {
      name: "address",
      label: "Địa chỉ",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: (
        <Input.TextArea rows={4} placeholder="Địa chỉ"></Input.TextArea>
      ),
    },
    {
      name: "description",
      label: "Mô tả",
      formChildren: (
        <Input.TextArea rows={4} placeholder="Mô tả"></Input.TextArea>
      ),
    },
  ];

  const fetchDetailHTX = () => {
    return htxApi.getDetail();
  };

  let result: any = {};

  const detailHTX: any = useQuery(["htx/detail"], fetchDetailHTX);
  if (detailHTX?.data) {
    result = detailHTX?.data?.data;

    const date = [
      {
        key: "created_at",
        value: result?.created_at,
      },
    ];

    if (convertToMoment(date)) {
      result = {
        ...result,
        ...convertToMoment(date),
      };
    }
  }

  const handleFormSubmit = (values: any) => {
    console.log(values);

    // mutatationUpdateProfile.mutate(values, {
    //   onSuccess: (res) => {
    //     getResponseMessage(res);
    //   },
    //   onError: (err) => {
    //     getErrorMessage(err);
    //   },
    // });
  };

  // const mutatationUpdateProfile = useMutation((data) =>
  //   commontApi.updateProfile(name, data)
  // );

  let formComponentProps: any = {
    loading: false,
    onSubmit: handleFormSubmit,
    name: "htx/detail",
    buttonSubmit: "Cập nhật",
    data: detailHTXForm,
    hideBtnSubmit: false,
  };

  if (Object.keys(result).length > 0) {
    formComponentProps = {
      ...formComponentProps,
      initialValues: result,
    };
  }
  return (
    <Spin spinning={detailHTX.isLoading} style={{ height: "100vh" }}>
      <div className="profile">
        <h3>Chi tiết hợp tác xã</h3>
        {Object.keys(result).length > 0 && (
          <FormComponent {...formComponentProps}></FormComponent>
        )}
      </div>
    </Spin>
  );
};

export default DetailHTX;

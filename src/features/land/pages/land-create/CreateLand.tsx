import { Input } from "antd";
import React from "react";
import FormComponent from "../../../../components/form-component/FormComponent";

type Props = {};

const CreateLand = (props: Props) => {
  const landForm = [
    {
      name: "address",
      label: "Địa chỉ",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input.TextArea placeholder="Địa chỉ"></Input.TextArea>,
    },
    {
      name: "description",
      label: "Mô tả",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input.TextArea placeholder="Mô tả"></Input.TextArea>,
    },
    {
      name: "thumbnail",
      label: "Hình ảnh",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input placeholder="Hình ảnh"></Input>,
    },
  ];

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  let formComponentProps: any = {
    loading: false,
    onSubmit: handleFormSubmit,
    name: "season",
    buttonSubmit: "Tạo thửa đất",
    hideBtnSubmit: false,
    data: landForm,
  };

  // if (Object.keys(user).length > 0) {
  //   formComponentProps = {
  //     ...formComponentProps,
  //     initialValues: user,
  //   };
  return (
    <div className="create-land">
      <h3>Thêm thửa đất</h3>
      <FormComponent {...formComponentProps}></FormComponent>
    </div>
  );
};

export default CreateLand;

import { DatePicker, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { convertToMoment } from "../../utils/convertToMoment";
import FormComponent from "../form-component/FormComponent";
import "./profile.scss";

type Props = {};

const Profile = (props: Props) => {
  let user = useSelector((state: any) => state.user.user);

  const profileForm = [
    {
      name: "fullname",
      label: "Họ tên",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input placeholder="Họ tên"></Input>,
    },
    {
      name: "email",
      label: "Email",
      rules: [
        {
          required: true,
        },
        {
          type: "email",
        },
      ],
      formChildren: <Input placeholder="Email"></Input>,
    },
    {
      name: "dob",
      label: "Ngày sinh",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: (
        <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
      ),
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
  ];

  if (user) {
    const date = [
      {
        key: "dob",
        value: user.dob,
      },
    ];

    if (convertToMoment(date)) {
      user = {
        ...user,
        ...convertToMoment(date),
      };
    }
  }

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  let formComponentProps: any = {
    loading: false,
    onSubmit: handleFormSubmit,
    name: "season",
    buttonSubmit: "Cập nhật",
    data: profileForm,
    hideBtnSubmit: false,
  };

  if (Object.keys(user).length > 0) {
    formComponentProps = {
      ...formComponentProps,
      initialValues: user,
    };
  }
  return (
    <div className="profile">
      <h3>Cập nhật thông tin cá nhân</h3>
      <FormComponent {...formComponentProps}></FormComponent>
    </div>
  );
};

export default Profile;

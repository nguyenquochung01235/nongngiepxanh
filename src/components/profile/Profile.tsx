import { useMutation, useQuery } from "@tanstack/react-query";
import { DatePicker, Input, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import commontApi from "../../api/common";
import { convertToMoment } from "../../utils/convertToMoment";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { getResponseMessage } from "../../utils/getResponseMessage";
import FormComponent from "../form-component/FormComponent";
import "./profile.scss";

type Props = {
  name: string;
};

const Profile = ({ name }: Props) => {
  let user = useSelector((state: any) => state.user.user);

  const fetchProfile = () => {
    return commontApi.getDetail(name);
  };

  const profile = useQuery(["profile"], fetchProfile);
  let result: any = {};

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

  if (profile?.data) {
    result = profile?.data?.data;

    const date = [
      {
        key: "dob",
        value: result?.dob,
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
    mutatationUpdateProfile.mutate(values, {
      onSuccess: (res) => {
        getResponseMessage(res);
      },
      onError: (err) => {
        getErrorMessage(err);
      },
    });
  };

  const mutatationUpdateProfile = useMutation((data) =>
    commontApi.updateProfile(name, data)
  );

  let formComponentProps: any = {
    loading: mutatationUpdateProfile.isLoading,
    onSubmit: handleFormSubmit,
    name: "profile",
    buttonSubmit: "Cập nhật",
    data: profileForm,
    hideBtnSubmit: false,
  };

  if (Object.keys(result).length > 0) {
    formComponentProps = {
      ...formComponentProps,
      initialValues: result,
    };
  }
  return (
    <Spin spinning={profile.isLoading} style={{ height: "100vh" }}>
      <div className="profile">
        <h3>Cập nhật thông tin cá nhân</h3>
        {Object.keys(result).length > 0 && (
          <FormComponent {...formComponentProps}></FormComponent>
        )}
      </div>
    </Spin>
  );
};

export default Profile;

import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import FormComponent from "../../../../components/form-component/FormComponent";
import type { UploadProps } from "antd";
import landApi from "../../../../api/land";
import { useState } from "react";
import axios from "axios";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type Props = {};

const CreateLand = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const navigate = useNavigate();

  const uploadProps = {
    name: "thumbnail",
  };
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
  ];

  const handleFormSubmit = async (values: any) => {
    const formData: FormData = new FormData();
    formData.append("address", values.address);
    formData.append("description", values.description);

    mutation_create_land.mutate(formData, {
      onSuccess: (res) => {
        getResponseMessage(res);
        navigate("/htx/manage-land/map", {
          state: {
            position: res?.data,
          },
        });
      },
      onError: (err) => {
        getErrorMessage(err);
      },
    });
  };

  const mutation_create_land = useMutation((data: any) => landApi.create(data));

  let formComponentProps: any = {
    loading: mutation_create_land.isLoading,
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

  const handleUploadFile = (e: any) => {
    console.log(e.target.files[0]);

    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="create-land">
      <h3>Thêm thửa đất</h3>
      <FormComponent {...formComponentProps}></FormComponent>
      {/* <input type="file" name="file" onChange={handleUploadFile} /> */}
    </div>
  );
};

export default CreateLand;

import { useMutation, useQuery } from "@tanstack/react-query";
import { Input, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import landApi from "../../../../api/land";
import FormComponent from "../../../../components/form-component/FormComponent";
import UploadImag from "../../../../components/upload-image/UploadImage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getResponseMessage } from "../../../../utils/getResponseMessage";

type Props = {};

const DetailLand = (props: Props) => {
  const { id } = useParams();
  const [file, setFile] = useState<any>();

  const handleChangeImage = (file: any) => {
    setFile(file);
  };

  const fetchDetailLand = (id: any) => {
    return landApi.getDetail(id);
  };

  const land = useQuery(["land/detail"], () => fetchDetailLand(id || ""));

  const detailLandForm = [
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
      label: "",
      formChildren: (
        <UploadImag
          image={land?.data?.data.thumbnail || null}
          onChange={handleChangeImage}
        ></UploadImag>
      ),
    },
    {
      name: "location",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: (
        <Input.TextArea hidden placeholder="Location"></Input.TextArea>
      ),
    },
  ];

  const handleFormSubmit = (values: any) => {
    values.thumbnail = file || null;

    const formData: any = new FormData();
    formData.append("address", values.address || "");
    formData.append("description", values.description || "");
    formData.append("location", values.location || "");
    formData.append("thumbnail", values.thumbnail || "");

    mutation_update_land.mutate(formData, {
      onSuccess: (res) => {
        getResponseMessage(res);
      },
      onError: (err) => {
        getErrorMessage(err);
      },
    });
  };

  const mutation_update_land = useMutation((data) =>
    landApi.update(data, id || "")
  );

  let formComponentProps: any = {
    loading: mutation_update_land.isLoading,
    onSubmit: handleFormSubmit,
    name: "land/detail",
    buttonSubmit: "Cập nhật",
    data: detailLandForm,
    hideBtnSubmit: false,
    showBack: false,
  };

  if (land?.data?.data && Object.keys(land?.data?.data).length > 0) {
    formComponentProps = {
      ...formComponentProps,
      initialValues: land?.data?.data,
    };
  }

  return (
    <Spin spinning={land.isLoading}>
      <div className="detail-land">
        <h3>Chỉnh sửa thông tin thửa đất</h3>
        {land?.data?.data && Object.keys(land?.data?.data).length > 0 && (
          <FormComponent {...formComponentProps}></FormComponent>
        )}
      </div>
    </Spin>
  );
};

export default DetailLand;

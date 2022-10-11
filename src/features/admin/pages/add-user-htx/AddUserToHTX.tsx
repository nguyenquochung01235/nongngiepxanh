import { useMutation } from "@tanstack/react-query";
import { Input, Row, Col, Descriptions, Button, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import htxApi from "../../../../api/htx";
import "./add-user-htx.scss";

type Props = {};

const AddUserToHTX = (props: Props) => {
  const [seachValue, setSearchValue] = useState<string>("");
  const [user, setUser] = useState<any>();
  const userStored = useSelector((state: any) => state.user.user);
  const role = useSelector((state: any) => state.htx.role);

  const mutation = useMutation((value: any) => {
    return htxApi.searchUser(value);
  });
  
  const handleSeachUser = async () => {
    mutation.mutate(
      { phone_number: seachValue },
      {
        onSuccess: (data) => {
          setUser(data.data);
        },
      }
    );
  };

  const mutation_addUser = useMutation((data: any) =>
    htxApi.addNewMember(data)
  );

  const handleAddUserToHTX = async () => {
    const data = {
      id_user: userStored.id_user,
      id_hoptacxa: role.id_hoptacxa,
    };

    try {
      mutation_addUser.mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-user-to-htx">
      <h3 className="add-user-to-htx__heading">Thêm Xã Viên</h3>
      <Row>
        <Col span={8}>
          <div className="add-user-to-htx__search">
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Tìm kiếm vã viên"
              size="middle"
              style={{ borderRadius: "5px" }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSeachUser();
                }
              }}
            />
            <Button
              loading={mutation.isLoading}
              type="primary"
              style={{ borderRadius: "5px" }}
              onClick={handleSeachUser}
            >
              Tìm kiếm
            </Button>
          </div>
        </Col>
      </Row>
      <br />
      <br />
      {user && (
        <Row>
          <Col span={24} className="add-user-to-htx-des">
            <Descriptions title="Thông tin xã viên">
              <Descriptions.Item label="Tên Xã Viên">
                {user && user?.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {user && user?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {user && user?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {user && user?.dob}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <br />
          <Col span={24}>
            <Button
              loading={mutation_addUser.isLoading}
              type="primary"
              onClick={handleAddUserToHTX}
            >
              Thêm xã viên
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AddUserToHTX;

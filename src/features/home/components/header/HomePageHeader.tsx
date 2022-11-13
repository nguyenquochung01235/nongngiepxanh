import { Col, Row, Input, Avatar, Dropdown, Menu } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./home-page-header.scss";
import ListMenu from "../list-menu/ListMenu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleLogout } from "../../../../utils/logout";
type Props = {};

const HomePageHeader = (props: Props) => {
  const user = useSelector((state: any) => state.user?.user);

  const navigate = useNavigate();

  let data = user?.account.map((item: any) => {
    if (item) {
      return {
        ...item,
        label: (
          <div className="account-dropdown">
            <Link
              to={
                item?.name === "Xã Viên"
                  ? "/htx/dashboard"
                  : "/trader/dashboard"
              }
            >
              Vào trang quản lý {item?.name}
            </Link>
          </div>
        ),
        key: item?.id_account,
      };
    }
  });
  user &&
    data.push(
      {
        label: (
          <span
            onClick={() => navigate("/user-detail")}
            className="account-dropdown"
          >
            Thông tin cá nhân
          </span>
        ),
        key: "profile",
      },
      {
        label: (
          <span
            onClick={() => handleLogout(navigate)}
            className="account-dropdown"
          >
            Đăng xuất
          </span>
        ),
        key: "logout",
      }
    );
  const menu = <Menu items={data || []} />;

  return (
    <div className="home-header">
      <Row
        gutter={12}
        style={{
          padding: "12px 160px 8px 160px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col lg={4} md={4} sm={4} xs={4}>
          <div className="home-header__logo">Nông nghiệp xanh</div>
        </Col>
        <Col lg={15} md={12} sm={0} xs={0}>
          <div className="home-header__search" style={{ textAlign: "right" }}>
            <Input
              className="border-none"
              placeholder="Tìm kiếm thông tin"
              style={{ width: "85%" }}
            />
            <SearchOutlined />
          </div>
        </Col>
        <Col lg={5} md={4} sm={4} xs={4}>
          <div className="home-header__auth">
            {user ? (
              <Dropdown overlay={menu} trigger={["click"]} arrow>
                <div className="cursor-poiner text-small">
                  <img
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginRight: "8px",
                      padding: "4px",
                      border: "1px solid #fff",
                    }}
                    src={
                      user?.avatar ||
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                    }
                    alt=""
                  />
                  <a
                    style={{ color: "inherit" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {user?.fullname}
                  </a>
                </div>
              </Dropdown>
            ) : (
              <>
                <span className="cursor-poiner text-small">
                  <Link to="/login" style={{ color: "inherit" }}>
                    Đăng nhập |
                  </Link>
                </span>

                <span className="cursor-poiner text-small">
                  <Link to="/register" style={{ color: "inherit" }}>
                    Đăng kí
                  </Link>
                </span>
              </>
            )}
          </div>
        </Col>
        <Row>
          <Col span={24}>
            <ListMenu></ListMenu>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default HomePageHeader;

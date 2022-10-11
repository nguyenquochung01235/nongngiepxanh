import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BellOutlined,
  BugOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../../../../assets/images/admin-logo.jpg";
import { PATH } from "../../../../enum";
import { handleLogout } from "../../../../utils/logout";
import CreateCategoryPertocodes from "../../pages/category-pesticides-management/CategoryPertocodesManagement";

const { Header, Sider, Content } = Layout;

const HomeTraders = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    (() => {
      setCurrentPath("/trader/" + location.pathname.split("/")[2]);
    })();
  }, [location.pathname]);

  const createMenu = [
    {
      key: `${PATH.TRADER}${PATH.DASHBOARD}`,
      icon: <AppstoreAddOutlined />,
      label: (
        <Link to={`${PATH.TRADER}${PATH.DASHBOARD}`}>Bảng điều khiển</Link>
      ),
    },
    {
      key: `${PATH.TRADER}${PATH.CREATE_CATEGORY_MANAGEMENT}`,
      icon: <BugOutlined />,
      label: (
        <Link to={`${PATH.TRADER}${PATH.CREATE_CATEGORY_MANAGEMENT}`}>
          Danh mục phân bón
        </Link>
      ),
    },
  ];

  const menu: any = (
    <Menu
      items={[
        {
          key: "logout",
          label: <div onClick={() => handleLogout(navigate)}>Log out</div>,
        },
        {
          key: "profile",
          label: <span>Thông tin cá nhân</span>,
        },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="side-bar"
      >
        <div className="logo">
          <Link to={`${PATH.TRADER}${PATH.DASHBOARD}`}>
            <img src={logo} alt="" />
          </Link>
        </div>
        {currentPath && (
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentPath]}
            items={createMenu}
          />
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
          }}
          className="header-admin"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="user-info">
            <Space align="center">
              <Dropdown overlay={menu} arrow trigger={["click"]}>
                <img
                  src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/309618529_609451127526535_5667139700875500162_n.jpg?stp=cp6_dst-jpg&_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=svpfCvasj-sAX8vjFB7&_nc_ht=scontent.fsgn2-8.fna&oh=00_AT8020XjyBLhVkGFhZIH4_J473VUuK2tzkP4N5qEB0y9JQ&oe=63477AA7"
                  alt=""
                />
              </Dropdown>
              <div className="notification ml-12 center">
                <BellOutlined style={{ fontSize: "18px" }} />
              </div>
              <div className="app ml-12 center">
                <AppstoreOutlined style={{ fontSize: "18px" }} />
              </div>
            </Space>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route
              path={PATH.CREATE_CATEGORY_MANAGEMENT}
              element={<CreateCategoryPertocodes></CreateCategoryPertocodes>}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeTraders;

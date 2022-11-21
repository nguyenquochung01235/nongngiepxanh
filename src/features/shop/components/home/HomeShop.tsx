import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BellOutlined,
  BugOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Layout, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Notification from "../../../../components/notification/Notification";
import Profile from "../../../../components/profile/Profile";
import { PATH } from "../../../../enum";
import { resetCount } from "../../../../redux/notificationSlice";
import { handleLogout } from "../../../../utils/logout";
import Dashboard from "../../../admin/pages/dashboard/Dashboard";
import CreateShop from "../../pages/create-shop-rice/CreateShop";
import DetailShopContract from "../../pages/detail-shop-contract/DetailShopContract";
import ShopManagement from "../../pages/shop-management/ShopManagement";

const { Header, Sider, Content } = Layout;

const HomeShop = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const location = useLocation();
  const notification = useSelector((state: any) => state.notification);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      setCurrentPath("/shop/" + location.pathname.split("/")[2]);
    })();
  }, [location.pathname]);

  const createMenu = [
    {
      key: `${"/shop"}${PATH.DASHBOARD}`,
      icon: <AppstoreAddOutlined />,
      label: <Link to={`${"/shop"}${PATH.DASHBOARD}`}>Bảng điều khiển</Link>,
    },
    {
      key: `${"/shop"}${"/shop-management"}`,
      icon: <TransactionOutlined />,
      label: (
        <Link to={`${"/shop"}${"/shop-management"}`}>Giao dịch lúa giống</Link>
      ),
    },
  ];

  const menu: any = (
    <Menu
      items={[
        {
          key: PATH.PROFILE,
          label: (
            <span>
              <Link to={`${"/shop"}${PATH.PROFILE}`}>Thông tin cá nhân</Link>
            </span>
          ),
        },
        {
          key: "logout",
          label: <div onClick={() => handleLogout(navigate)}>Đăng xuất</div>,
        },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="side-bar"
      >
        <div className="logo">
          <Link to={`${"/shop"}${PATH.DASHBOARD}`}>
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              alt=""
            />
          </Link>
          {
            <div
              style={
                !collapsed
                  ? {
                      display: "block",
                    }
                  : { display: "none" }
              }
              className="logo-title opacity"
            >
              Nhà cung cấp vật tư
            </div>
          }
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
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  alt=""
                />
              </Dropdown>
              <div
                onClick={() => dispatch(resetCount())}
                className="notification ml-16 center"
                style={{ cursor: "pointer" }}
              >
                <Dropdown
                  overlay={<Notification></Notification>}
                  placement="bottomRight"
                  trigger={["click"]}
                  arrow
                >
                  <Badge count={notification?.count || 0} showZero={false}>
                    <BellOutlined style={{ fontSize: "18px" }} />
                  </Badge>
                </Dropdown>
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
              path={PATH.DASHBOARD}
              element={<Dashboard url="thuonglai/dash-board"></Dashboard>}
            ></Route>
            <Route
              path={"/shop-management"}
              element={<ShopManagement></ShopManagement>}
            ></Route>
            <Route
              path={"/shop-management/create-shop"}
              element={<CreateShop></CreateShop>}
            ></Route>
            <Route
              path={"/shop-management/detail-contract/:id"}
              element={<DetailShopContract></DetailShopContract>}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeShop;

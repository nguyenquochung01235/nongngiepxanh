import {
  ApiOutlined,
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
import CreateContractSupplier from "../../pages/create-contract-supplier/CreateContractSupplier";
import CreateShop from "../../pages/create-shop-rice/CreateShop";
import DetailShopContract from "../../pages/detail-shop-contract/DetailShopContract";
import DetailSupplierContract from "../../pages/detail-supplier-contract/DetailSupplierContract";
import ShopManagement from "../../pages/shop-management/ShopManagement";
import SupplierManagement from "../../pages/supplier-management/SupplierManagement";

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
      label: <Link to={`${"/shop"}${PATH.DASHBOARD}`}>B???ng ??i???u khi???n</Link>,
    },
    {
      key: `${"/shop"}${"/shop-management"}`,
      icon: <TransactionOutlined />,
      label: (
        <Link to={`${"/shop"}${"/shop-management"}`}>Giao d???ch l??a gi???ng</Link>
      ),
    },
    {
      key: `${"/shop"}${"/supplier-management"}`,
      icon: <ApiOutlined />,
      label: (
        <Link to={`${"/shop"}${"/supplier-management"}`}>Giao d???ch v???t t??</Link>
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
              <Link to={`${"/shop"}${PATH.PROFILE}`}>Th??ng tin c?? nh??n</Link>
            </span>
          ),
        },
        {
          key: "logout",
          label: <div onClick={() => handleLogout(navigate)}>????ng xu???t</div>,
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
              Nh?? cung c???p v???t t??
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
              element={<Dashboard url="nhacungcapvattu/dash-board"></Dashboard>}
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
            <Route
              path={"/supplier-management"}
              element={<SupplierManagement></SupplierManagement>}
            ></Route>
            <Route
              path={"/supplier-management/create-contract-supplier"}
              element={<CreateContractSupplier></CreateContractSupplier>}
            ></Route>
            <Route
              path={"/supplier-management/detail-supplier-contract/:id"}
              element={<DetailSupplierContract></DetailSupplierContract>}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeShop;

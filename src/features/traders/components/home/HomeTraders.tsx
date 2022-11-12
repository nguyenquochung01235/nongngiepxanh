import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BellOutlined,
  BugOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
import logo from "../../../../assets/images/admin-logo.jpg";
import Notification from "../../../../components/notification/Notification";
import Profile from "../../../../components/profile/Profile";
import { PATH } from "../../../../enum";
import { resetCount } from "../../../../redux/notificationSlice";
import { handleLogout } from "../../../../utils/logout";
import Dashboard from "../../../admin/pages/dashboard/Dashboard";
import CreateCategoryPertocodes from "../../pages/category-pesticides-management/CategoryPertocodesManagement";
import CreateContract from "../../pages/create-contract/CreateContract";
import DetailContract from "../../pages/detail-contract/DetailContract";
import DetailCategory from "../../pages/detailCategory/DetailCategory";
import ContractManagement from "../contract/ContractManagement";

const { Header, Sider, Content } = Layout;

const HomeTraders = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const location = useLocation();
  const notification = useSelector((state: any) => state.notification);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      key: `${PATH.TRADER}${PATH.CATEGORY_MANAGEMENT}`,
      icon: <BugOutlined />,
      label: (
        <Link to={`${PATH.TRADER}${PATH.CATEGORY_MANAGEMENT}`}>
          Danh mục qui định
        </Link>
      ),
    },
    {
      key: `${PATH.TRADER}${PATH.CONTRACT_MANAGEMENT}`,
      icon: <ContainerOutlined />,
      label: (
        <Link to={`${PATH.TRADER}${PATH.CONTRACT_MANAGEMENT}`}>
          Quản lý hợp đồng
        </Link>
      ),
    },
    // {
    //   key: `${PATH.TRADER}${PATH.SUPPLIER}`,
    //   icon: <FullscreenExitOutlined />,
    //   label: <Link to={`${PATH.TRADER}${PATH.SUPPLIER}`}>Quản lý vật tư</Link>,
    // },
  ];

  const menu: any = (
    <Menu
      items={[
        {
          key: PATH.PROFILE,
          label: (
            <span>
              <Link to={`${PATH.TRADER}${PATH.PROFILE}`}>
                Thông tin cá nhân
              </Link>
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
          <Link to={`${PATH.TRADER}${PATH.DASHBOARD}`}>
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
              Thương Lái
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
              path={PATH.CATEGORY_MANAGEMENT}
              element={<CreateCategoryPertocodes></CreateCategoryPertocodes>}
            ></Route>
            <Route
              path={PATH.CONTRACT_MANAGEMENT}
              element={<ContractManagement></ContractManagement>}
            ></Route>
            <Route
              path={`${PATH.CONTRACT_MANAGEMENT}${PATH.CONTRACT_CREATE}`}
              element={<CreateContract></CreateContract>}
            ></Route>
            <Route
              path={`${PATH.CONTRACT_MANAGEMENT}${PATH.CONTRACT_DETAIL}`}
              element={<DetailContract></DetailContract>}
            ></Route>
            <Route
              path={`${PATH.CONTRACT_MANAGEMENT}${PATH.CONTRACT_DETAIL}`}
              element={<DetailContract></DetailContract>}
            ></Route>
            <Route
              path={`${PATH.CATEGORY_MANAGEMENT}${PATH.CATEGORY_DETAIL}`}
              element={<DetailCategory></DetailCategory>}
            ></Route>
            {/* <Route
              path={`${PATH.SUPPLIER}`}
              element={<Supplier></Supplier>}
            ></Route> */}
            <Route
              path={PATH.PROFILE}
              element={<Profile name="thuonglai"></Profile>}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeTraders;

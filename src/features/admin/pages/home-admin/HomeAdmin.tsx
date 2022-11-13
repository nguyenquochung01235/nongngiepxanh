import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  YuqueOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Space,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import userApi from "../../../../api/userApi";
import logo from "../../../../assets/images/admin-logo.jpg";
import NotFound from "../../../../components/not-found/NotFound";
import Notification from "../../../../components/notification/Notification";
import Profile from "../../../../components/profile/Profile";
import { COMMON, PATH } from "../../../../enum";
import { hasHTX, isChairman, reset, setRole } from "../../../../redux/htxSlice";
import { toggleLoading } from "../../../../redux/loadingSlice";
import { resetCount } from "../../../../redux/notificationSlice";
import { setTheme } from "../../../../utils/changeTheme";
import { handleLogout } from "../../../../utils/logout";
import Calendar from "../../../calendar/Calendar";
import Map from "../../../land/components/map/Map";
import DetailLand from "../../../land/pages/detail-land/DetailLand";
import CreateLand from "../../../land/pages/land-create/CreateLand";
import Landmanagement from "../../../land/pages/land-management/Landmanagement";
import StoryOfSeason from "../../../story/pages/StoryOfSeason";
import Story from "../../../story/Story";
import ContractManagement from "../../../traders/components/contract/ContractManagement";
import DetailContract from "../../../traders/pages/detail-contract/DetailContract";
import RenderChangeApp from "../../components/render-change-app/RenderChangeApp";
import AddUserToHTX from "../add-user-htx/AddUserToHTX";
import CreateHTX from "../create-htx/CreateHTX";
import Dashboard from "../dashboard/Dashboard";
import HTXManagement from "../htx-management/HTXManagement";
import SeasonActivity from "../season-activity/SeasonActivity";
import DetailSeaSon from "../season-management/pages/detail/DetailSeaSon";
import SeasonManagement from "../season-management/pages/list/SeasonManagement";
import "./home-admin.scss";

const { Header, Sider, Content } = Layout;

const HomeAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [roles, setRoles] = useState<any>();
  const [currentPath, setCurrentPath] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const notification = useSelector((state: any) => state.notification);
  const user = useSelector((state: any) => state.user);
  const htx = useSelector((state: any) => state.htx.hasHTX);
  const roleHtx = useSelector((state: any) => state.htx);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const location: any = useLocation();
  const changeRole =
    localStorage.getItem("account") || location.state?.role || roles?.role;
  console.log(changeRole);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res: any = await userApi.roleOfUser(changeRole);

        if (res.data?.id_hoptacxa) {
          localStorage.setItem("htx", res.data);
          dispatch(hasHTX(true));
          dispatch(setRole(res.data));
          setRoles(res.data);

          if (changeRole === "chunhiem") {
            dispatch(isChairman(true));
            localStorage.setItem("account", "chunhiem");
          } else {
            dispatch(isChairman(false));
          }
        } else {
          setIsNewUser(true);
          dispatch(reset());
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [changeRole, localStorage.getItem("account")]);

  useEffect(() => {
    setCurrentPath("/htx/" + location.pathname.split("/")[2]);
  }, [location.pathname]);

  const createMenu = [
    {
      key: `${PATH.HTX}${PATH.DASHBOARD}`,
      icon: <UserOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.DASHBOARD}`}>Bảng điều khiển</Link>,
    },
    {
      key: `${PATH.HTX}${PATH.CREATE_HTX}`,
      icon: <UserOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.CREATE_HTX}`}>Tạo hợp tác xã</Link>,
    },
  ];

  const userMenu = [
    {
      key: `${PATH.HTX}${PATH.DASHBOARD}`,
      icon: <UserOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.DASHBOARD}`}>Bảng điều khiển</Link>,
    },
    {
      key: `/htx/manage-land`,
      icon: <PieChartOutlined />,
      label: <Link to="/htx/manage-land">Quản lý thửa đất</Link>,
    },
    {
      key: `/htx/manage-story`,
      icon: <CalendarOutlined />,
      label: <Link to="/htx/manage-story">Nhật ký đồng ruộng</Link>,
    },
    {
      key: `${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`,
      icon: <ContainerOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`}>
          Quản lý hợp đồng
        </Link>
      ),
    },
  ];

  const manageMenu = [
    {
      key: `${PATH.HTX}${PATH.DASHBOARD}`,
      icon: <AppstoreAddOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.DASHBOARD}`}>Bảng điều khiển</Link>,
    },
    {
      key: `${PATH.HTX}${PATH.MANAGE_HTX}`,
      icon: <UserOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.MANAGE_HTX}`}>Quản lý hợp tác xã</Link>
      ),
    },
    {
      key: `${PATH.HTX}${PATH.MANAGE_SEASON}`,
      icon: <YuqueOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.MANAGE_SEASON}`}>Quản lý mùa vụ</Link>
      ),
    },
    {
      key: `${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`,
      icon: <ContainerOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`}>
          Quản lý hợp đồng
        </Link>
      ),
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          key: COMMON.PROFILE,
          label: (
            <span>
              <Link to={`${PATH.HTX}${PATH.PROFILE}`}>Thông tin cá nhân</Link>
            </span>
          ),
        },
        {
          key: COMMON.LOGOUT,
          label: <div onClick={() => handleLogout(navigate)}>Đăng xuất</div>,
        },
      ]}
    />
  );

  const menuNotification = (
    <Menu
      items={[
        {
          key: "1",
          label: <div>Bạn có 1 thông báo mới</div>,
        },
        {
          key: "2",
          label: <div>Bạn có 1 thông báo mới</div>,
        },
      ]}
    />
  );

  const handleChangeTheme = () => {
    setTheme("#c69");
  };

  return (
    <Spin spinning={loading} style={{ minHeight: "100vh" }} size={"large"}>
      {roles || isNewUser ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width={250}
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="side-bar"
          >
            <div className="logo">
              <Link to={`${PATH.HTX}${PATH.DASHBOARD}`}>
                <img
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  alt=""
                />
              </Link>
              {
                <div>
                  <span
                    style={{
                      marginLeft: "12px",
                      fontSize: "11px",
                      color: "#333",
                    }}
                  >
                    Hợp tác xã
                  </span>
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
                    {roleHtx?.role?.name_hoptacxa || ""}
                  </div>
                </div>
              }
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[currentPath]}
              selectedKeys={[currentPath]}
              items={
                htx
                  ? roles?.role === "xavien"
                    ? userMenu
                    : manageMenu
                  : isNewUser
                  ? createMenu
                  : []
              }
            />
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
                  <Dropdown
                    overlay={menu}
                    placement="bottomRight"
                    trigger={["click"]}
                    arrow
                  >
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
                  <div className="app ml-16 center">
                    <AppstoreOutlined
                      style={{ fontSize: "18px" }}
                      onClick={showDrawer}
                    />
                  </div>
                </Space>
              </div>
            </Header>
            <Drawer
              title="Chuyển đổi nhanh"
              placement="right"
              onClose={onClose}
              open={open}
              width={250}
            >
              <RenderChangeApp
                account={user?.user?.account || []}
              ></RenderChangeApp>
            </Drawer>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Routes>
                {(roles || isNewUser) && (
                  <>
                    <Route
                      path={PATH.DASHBOARD}
                      element={<Dashboard url="htx/dash-board"></Dashboard>}
                    ></Route>
                    {isNewUser && (
                      <Route
                        path={PATH.CREATE_HTX}
                        element={<CreateHTX></CreateHTX>}
                      ></Route>
                    )}

                    {(roles?.role === "xavien" ||
                      roles?.role === "chunhiem") && (
                      <>
                        <Route
                          path="/manage-story"
                          element={<Story></Story>}
                        ></Route>
                        <Route
                          path="/manage-land"
                          element={
                            <Landmanagement baseUrl="htx/manage-land"></Landmanagement>
                          }
                        ></Route>
                        <Route
                          path="/manage-land/create"
                          element={<CreateLand></CreateLand>}
                        ></Route>
                        <Route
                          path="/manage-land/detail/:id"
                          element={<DetailLand></DetailLand>}
                        ></Route>
                        <Route
                          path="/manage-story/detail/:id"
                          element={<StoryOfSeason></StoryOfSeason>}
                        ></Route>
                        <Route
                          path={PATH.CONTRACT_MANAGEMENT}
                          element={
                            <ContractManagement
                              allowCreate={false}
                              allowDelete={false}
                              allowUpdate={false}
                              baseUrl="htx/contract-management"
                            ></ContractManagement>
                          }
                        ></Route>
                        <Route
                          path={`${PATH.CONTRACT_MANAGEMENT}${PATH.CONTRACT_DETAIL}`}
                          element={
                            <DetailContract
                              edit={roles?.role === "xavien" ? false : true}
                              baseUrl="htx/contract-management"
                            ></DetailContract>
                          }
                        ></Route>
                        <Route path="*" element={<NotFound />} />
                      </>
                    )}

                    <Route
                      path={PATH.ADD_USER_TO_HTX}
                      element={<AddUserToHTX></AddUserToHTX>}
                    ></Route>
                    <Route
                      path={PATH.MANAGE_HTX}
                      element={<HTXManagement></HTXManagement>}
                    ></Route>
                    <Route
                      path={PATH.MANAGE_SEASON}
                      element={<SeasonManagement></SeasonManagement>}
                    ></Route>
                    <Route
                      path={PATH.MANAGE_SEASON_DETAIL}
                      element={<DetailSeaSon></DetailSeaSon>}
                    ></Route>
                    <Route
                      path={PATH.MANAGE_ACTIVITY}
                      element={<SeasonActivity></SeasonActivity>}
                    ></Route>
                    <Route
                      path={PATH.CALENDAR}
                      element={<Calendar></Calendar>}
                    ></Route>
                    <Route
                      path={PATH.PROFILE}
                      element={<Profile name="xavien"></Profile>}
                    ></Route>
                    <Route
                      path="/manage-land/create"
                      element={<CreateLand></CreateLand>}
                    ></Route>
                    <Route
                      path="/manage-land/map"
                      element={<Map></Map>}
                    ></Route>
                    <Route
                      path={PATH.CONTRACT_MANAGEMENT}
                      element={
                        <ContractManagement
                          allowCreate={false}
                          allowDelete={false}
                          baseUrl="htx/contract-management"
                        ></ContractManagement>
                      }
                    ></Route>
                    <Route
                      path={`${PATH.CONTRACT_MANAGEMENT}${PATH.CONTRACT_DETAIL}`}
                      element={
                        <DetailContract baseUrl="htx/contract-management"></DetailContract>
                      }
                    ></Route>
                    <Route path="*" element={<NotFound />} />
                  </>
                )}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <></>
      )}
    </Spin>
  );
};

export default HomeAdmin;

import {
  ApiOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  ContainerOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PayCircleOutlined,
  PieChartOutlined,
  SnippetsOutlined,
  TransactionOutlined,
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
import React, { useEffect, useRef, useState } from "react";
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
import CreatePost from "../../../post/pages/create-post/CreatePost";
import DetailPost from "../../../post/pages/detail-post/DetailPost";
import PostManagement from "../../../post/pages/post-management/PostManagement";
import DetailRiceTransactionUser from "../../../rice-transaction/pages/detail-rice-transaction-user/DetailRiceTransactionUser";
import RiceTransactionManagement from "../../../rice-transaction/pages/RiceTransactionManagement";
import CreateShop from "../../../shop/pages/create-shop-rice/CreateShop";
import DetailShopContract from "../../../shop/pages/detail-shop-contract/DetailShopContract";
import DetailSupplierContract from "../../../shop/pages/detail-supplier-contract/DetailSupplierContract";
import ShopManagement from "../../../shop/pages/shop-management/ShopManagement";
import SupplierManagement from "../../../shop/pages/supplier-management/SupplierManagement";
import StoryOfSeason from "../../../story/pages/StoryOfSeason";
import Story from "../../../story/Story";
import ContractManagement from "../../../traders/components/contract/ContractManagement";
import DetailContract from "../../../traders/pages/detail-contract/DetailContract";
import RenderChangeApp from "../../components/render-change-app/RenderChangeApp";
import AddUserToHTX from "../add-user-htx/AddUserToHTX";
import CreateHTX from "../create-htx/CreateHTX";
import Dashboard from "../dashboard/Dashboard";
import DetailHTX from "../detail-htx/DetailHTX";
import HTXManagement from "../htx-management/HTXManagement";
import HTXStorymanagement from "../htx-story-management/HTXStorymanagement";
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
  const isChairmanSlt = useSelector((state: any) => state.htx.isChairman);
  const roleHtx = useSelector((state: any) => state.htx);
  const navigate = useNavigate();
  const isFirst = useRef(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const location: any = useLocation();
  const changeRole = location.state?.role;
  const currentAccount = localStorage.getItem("current_account");

  useEffect(() => {
    (async () => {
      if (isFirst.current) {
        if (!changeRole) {
          return;
        }
      }
      setLoading(true);
      isFirst.current = true;
      let res: any = null;
      try {
        if (!isFirst.current) {
          res = await userApi.roleOfUser(changeRole);
        } else {
          res = await userApi.roleOfUser(changeRole || currentAccount);
        }

        if (res.data?.id_hoptacxa) {
          localStorage.setItem("htx", res.data);
          dispatch(hasHTX(true));
          dispatch(setRole(res.data));
          setRoles(res.data);

          if (res.data.role === "xavien" && !isChairmanSlt) {
            dispatch(isChairman(false));
            localStorage.setItem("chairman", "");
          }

          if (changeRole === "chunhiem" || res.data.role === "chunhiem") {
            dispatch(isChairman(true));
            localStorage.setItem("chairman", "true");
            localStorage.setItem("account", "chunhiem");
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
  }, [changeRole, currentAccount]);

  useEffect(() => {
    setCurrentPath("/htx/" + location.pathname.split("/")[2]);
  }, [location.pathname]);

  const createMenu = [
    {
      key: `${PATH.HTX}${PATH.DASHBOARD}`,
      icon: <UserOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.DASHBOARD}`}>B???ng ??i???u khi???n</Link>,
    },
    {
      key: `${PATH.HTX}${PATH.CREATE_HTX}`,
      icon: <UserOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.CREATE_HTX}`}>T???o h???p t??c x??</Link>,
    },
  ];

  const userMenu = [
    {
      key: `${PATH.HTX}${PATH.DASHBOARD}`,
      icon: <UserOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.DASHBOARD}`}>B???ng ??i???u khi???n</Link>,
    },
    {
      key: `/htx/manage-land`,
      icon: <PieChartOutlined />,
      label: <Link to="/htx/manage-land">Qu???n l?? th???a ?????t</Link>,
    },
    {
      key: `/htx/manage-story`,
      icon: <CalendarOutlined />,
      label: <Link to="/htx/manage-story">Nh???t k?? ?????ng ru???ng</Link>,
    },
    {
      key: `${PATH.HTX}${"/shop-management"}`,
      icon: <TransactionOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/shop-management"}`}>Giao d???ch l??a gi???ng</Link>
      ),
    },
    {
      key: `${PATH.HTX}${"/supplier-management"}`,
      icon: <ApiOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/supplier-management"}`}>
          Giao d???ch v???t t??
        </Link>
      ),
    },
    {
      key: `${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`,
      icon: <ContainerOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`}>
          Qu???n l?? h???p ?????ng
        </Link>
      ),
    },
    {
      key: `${PATH.HTX}${"/rice-transaction-management"}`,
      icon: <PayCircleOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/rice-transaction-management"}`}>
          Giao d???ch l??a gi???ng
        </Link>
      ),
    },
  ];

  const manageMenu = [
    {
      key: `${PATH.HTX}${PATH.DASHBOARD}`,
      icon: <AppstoreAddOutlined />,
      label: <Link to={`${PATH.HTX}${PATH.DASHBOARD}`}>B???ng ??i???u khi???n</Link>,
    },
    {
      key: `${PATH.HTX}${PATH.MANAGE_HTX}`,
      icon: <UserOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.MANAGE_HTX}`}>Qu???n l?? h???p t??c x??</Link>
      ),
    },
    {
      key: `${PATH.HTX}${PATH.MANAGE_SEASON}`,
      icon: <YuqueOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.MANAGE_SEASON}`}>Qu???n l?? m??a v???</Link>
      ),
    },
    {
      key: `${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`,
      icon: <ContainerOutlined />,
      label: (
        <Link to={`${PATH.HTX}${PATH.CONTRACT_MANAGEMENT}`}>
          Qu???n l?? h???p ?????ng
        </Link>
      ),
    },
    {
      key: `${PATH.HTX}${"/shop-management"}`,
      icon: <TransactionOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/shop-management"}`}>Giao d???ch l??a gi???ng</Link>
      ),
    },
    {
      key: `${PATH.HTX}${"/supplier-management"}`,
      icon: <ApiOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/supplier-management"}`}>
          Giao d???ch v???t t??
        </Link>
      ),
    },
    {
      key: `${PATH.HTX}${"/story-of-user"}`,
      icon: <FormOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/story-of-user"}`}>Qu???n l?? s??? nh???t k??</Link>
      ),
    },
    {
      key: `${PATH.HTX}${"/rice-transaction-management"}`,
      icon: <PayCircleOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/rice-transaction-management"}`}>
          Giao d???ch l??a gi???ng
        </Link>
      ),
    },
    {
      key: `${PATH.HTX}${"/post-management"}`,
      icon: <SnippetsOutlined />,
      label: (
        <Link to={`${PATH.HTX}${"/post-management"}`}>Qu???n l?? b??i vi???t</Link>
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
              <Link to={`${PATH.HTX}${PATH.PROFILE}`}>Th??ng tin c?? nh??n</Link>
            </span>
          ),
        },
        {
          key: COMMON.LOGOUT,
          label: <div onClick={() => handleLogout(navigate)}>????ng xu???t</div>,
        },
      ]}
    />
  );

  const menuNotification = (
    <Menu
      items={[
        {
          key: "1",
          label: <div>B???n c?? 1 th??ng b??o m???i</div>,
        },
        {
          key: "2",
          label: <div>B???n c?? 1 th??ng b??o m???i</div>,
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
              <Link to={`${PATH.HTX}${"/manage-htx/detail"}`}>
                <img
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  alt=""
                />
              </Link>
              {
                <div>
                  <Link to={`${PATH.HTX}${"/manage-htx/detail"}`}>
                    <span
                      style={{
                        marginLeft: "12px",
                        fontSize: "11px",
                        color: "#333",
                      }}
                    >
                      H???p t??c x??
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
                  </Link>
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
              title="Chuy???n ?????i nhanh"
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

                    {roles?.role === "chunhiem" && (
                      <>
                        <Route
                          path={PATH.ADD_USER_TO_HTX}
                          element={<AddUserToHTX></AddUserToHTX>}
                        ></Route>
                        <Route
                          path={"/story-of-user"}
                          element={<HTXStorymanagement></HTXStorymanagement>}
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
                          path={"/shop-management"}
                          element={
                            <ShopManagement
                              baseUrl="htx"
                              role="chunhiem"
                            ></ShopManagement>
                          }
                        ></Route>
                        <Route
                          path={"/shop-management/detail-contract/:id"}
                          element={
                            <DetailShopContract baseUrl="chunhiem"></DetailShopContract>
                          }
                        ></Route>
                        <Route
                          path={"/supplier-management"}
                          element={
                            <SupplierManagement
                              role="chunhiem"
                              baseUrl="htx"
                            ></SupplierManagement>
                          }
                        ></Route>

                        <Route
                          path={
                            "/supplier-management/detail-supplier-contract/:id"
                          }
                          element={
                            <DetailSupplierContract baseUrl="chunhiem"></DetailSupplierContract>
                          }
                        ></Route>
                        <Route
                          path={"/rice-transaction-management"}
                          element={
                            <RiceTransactionManagement role="chunhiem"></RiceTransactionManagement>
                          }
                        ></Route>
                        <Route
                          path={"/rice-transaction-management/detail/:id"}
                          element={
                            <DetailRiceTransactionUser></DetailRiceTransactionUser>
                          }
                        ></Route>
                        <Route
                          path={"/post-management"}
                          element={<PostManagement></PostManagement>}
                        ></Route>
                        <Route
                          path={"/post-management/create"}
                          element={<CreatePost></CreatePost>}
                        ></Route>
                        <Route
                          path={"/post-management/detail/:id"}
                          element={<DetailPost></DetailPost>}
                        ></Route>
                      </>
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
                          path="/manage-htx/detail"
                          element={<DetailHTX></DetailHTX>}
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
                        <Route
                          path={"/shop-management"}
                          element={
                            <ShopManagement baseUrl="htx"></ShopManagement>
                          }
                        ></Route>
                        <Route
                          path={"/shop-management/detail-contract/:id"}
                          element={
                            <DetailShopContract baseUrl="htx"></DetailShopContract>
                          }
                        ></Route>
                        <Route
                          path={"/supplier-management"}
                          element={
                            <SupplierManagement baseUrl="htx"></SupplierManagement>
                          }
                        ></Route>

                        <Route
                          path={
                            "/supplier-management/detail-supplier-contract/:id"
                          }
                          element={
                            <DetailSupplierContract baseUrl="htx"></DetailSupplierContract>
                          }
                        ></Route>
                        <Route
                          path={"/rice-transaction-management"}
                          element={
                            <RiceTransactionManagement role="xavien"></RiceTransactionManagement>
                          }
                        ></Route>
                        <Route
                          path={"/rice-transaction-management/detail/:id"}
                          element={
                            <DetailRiceTransactionUser></DetailRiceTransactionUser>
                          }
                        ></Route>
                        <Route path="*" element={<NotFound />} />
                      </>
                    )}

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

import { Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRole } from "../../../../redux/htxSlice";

type Props = {
  account?: any[];
};

const RenderChangeApp = ({ account = [] }: Props) => {
  const role = useSelector((state: any) => state.htx.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let menu: any = [];

  if (account.length > 0) {
    account.forEach((item: any) => {
      if (item) {
        switch (item?.name) {
          case "Xã Viên":
            menu.push({ ...item, link: "/htx/dashboard" });
            break;
          case "Thuong Lai":
            menu.push({ ...item, link: "/htx/trader" });
            break;
        }

        if (item?.id_account == 1 && item?.name === "Xã Viên") {
          if (role.role === "chunhiem") {
            menu.push({
              id_account: "chunhiem",
              name: "Hợp Tác Xã",
              link: "/htx/dashboard",
            });
          }
        }
      }
    });
  }

  const handleNavigate = (link: string, name: string) => {
    if (name === "Xã Viên") {
      dispatch(
        setRole({
          ...role,
          role: "xavien",
        })
      );
    }
    navigate(link);
  };

  return (
    <div className="change-app">
      <Menu>
        {menu.map((item: any, index: number) => {
          return (
            <Menu.Item key={item?.name} className="radius-6">
              <span
                onClick={() =>
                  handleNavigate(item?.link || "", item?.name || "")
                }
              >
                {item?.name}
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default RenderChangeApp;

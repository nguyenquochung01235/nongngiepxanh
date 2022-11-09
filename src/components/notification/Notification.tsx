import { BellOutlined, LoadingOutlined } from "@ant-design/icons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Badge, Menu, Skeleton, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notificationApi from "../../api/notification";
import { setIsReadAll } from "../../redux/notificationSlice";
import "./notification.scss";

type Props = {};

const Notification = (props: Props) => {
  const dispatch = useDispatch();

  const fetchNotification = ({ pageParam = 1 }) => {
    return notificationApi.getAll({ page: pageParam });
  };

  const notificationQuery = useInfiniteQuery<any>({
    queryKey: ["notification"],
    queryFn: fetchNotification,
    getNextPageParam: (lastPage, pages: any) => {
      if (lastPage?.data?.length < 10) {
        return;
      } else {
        return pages.length + 1;
      }
    },
  });

  let result: any = [];

  if (notificationQuery?.data?.pages) {
    notificationQuery?.data?.pages.map((group: any, i) => {
      const temp = group?.data?.map((noti: any, index: number) => {
        return {
          status: noti?.status || null,
          key: noti?.id || "",
          label: (
            <div
              style={{
                margin: "4px 0",
                maxWidth: "300px",
                display: "flex",
                alignItems: "center",
              }}
              className={!noti?.status ? "new" : ""}
            >
              <span className="icon-noti">
                <BellOutlined />
              </span>
              <span style={{ display: "flex" }}>
                {" "}
                <span className="content-noti"> {noti?.message || ""}</span>
                <div> {!noti?.status && <Badge status="success" />}</div>
              </span>
            </div>
          ),
        };
      });
      result = [...result, ...temp];

      // const isReadAll = result?.every((item: any) => item?.status === 1);
      // dispatch(setIsReadAll(isReadAll));
    });
  }

  const handleScroll = (e: any) => {
    const scrollY = e.target.scrollHeight - e.target.scrollTop;
    const height = e.target.offsetHeight;
    const offset = height - scrollY;

    if (offset == 0 || offset == 1) {
      notificationQuery.fetchNextPage();
    }
  };

  if (notificationQuery.isFetchingNextPage) {
    result.push({
      key: "loading",
      label: (
        <div
          style={{
            maxWidth: "300px",
            textAlign: "center",
            fontSize: "24px",
            margin: "4px 0",
          }}
        >
          <LoadingOutlined />
        </div>
      ),
    });
  }

  return (
    <div className="notification">
      {notificationQuery.isLoading ? (
        <Menu
          items={[
            {
              key: "loading",
              label: (
                <div
                  style={{
                    width: "300px",
                    textAlign: "center",
                    padding: "12px 0",
                  }}
                >
                  <Skeleton avatar paragraph={{ rows: 1 }} active />
                  <Skeleton avatar paragraph={{ rows: 1 }} active />
                  <Skeleton avatar paragraph={{ rows: 1 }} active />
                  <Skeleton avatar paragraph={{ rows: 1 }} active />
                </div>
              ),
            },
          ]}
        ></Menu>
      ) : (
        <>
          {result?.length > 0 ? (
            <Menu
              onScroll={handleScroll}
              style={{
                maxHeight: "400px",
                overflow: "auto",
                overflowX: "hidden",
              }}
              items={result}
            ></Menu>
          ) : (
            <div className="no-noti">Bạn chưa có thông báo </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notification;

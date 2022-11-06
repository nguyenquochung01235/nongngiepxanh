import { LoadingOutlined } from "@ant-design/icons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Menu, Skeleton, Spin } from "antd";
import React, { useState } from "react";
import notificationApi from "../../api/notification";

type Props = {};

const Notification = (props: Props) => {
  const [page, setPage] = useState(1);

  const fetchNotification = ({ pageParam = 0 }) => {
    return notificationApi.getAll({ page: pageParam });
  };

  const notificationQuery = useInfiniteQuery<any>({
    queryKey: ["notification"],
    queryFn: fetchNotification,
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
    },
  });

  let result: any = [];

  if (notificationQuery?.data?.pages) {
    notificationQuery?.data?.pages.map((group: any, i) => {
      result = group?.data?.map((noti: any, index: number) => {
        return {
          key: noti?.id || "",
          label: (
            <div style={{ margin: "4px 0", maxWidth: "300px" }}>
              {noti?.message || ""}
            </div>
          ),
        };
      });
    });
  }

  const handleScroll = (e: any) => {
    const scrollY = e.target.scrollHeight - e.target.scrollTop;
    const height = e.target.offsetHeight;
    const offset = height - scrollY;

    if (offset == 0 || offset == 1) {
      if (result && result.length >= 10) {
        notificationQuery.fetchNextPage();
      }
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
          <Menu
            onScroll={handleScroll}
            style={{
              maxHeight: "400px",
              overflow: "auto",
            }}
            items={result}
          ></Menu>
        </>
      )}
    </div>
  );
};

export default Notification;

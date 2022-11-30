import React from "react";
import { listNews } from "../../../../../mock/news-data";
import "./list-news.scss";

type Props = {
  post?: any;
};

const ListNews = ({ post }: Props) => {
  return (
    <div className="list-news">
      <h3 className="list-news-heading">Tất cả bài viết</h3>
      {post &&
        post.length > 0 &&
        post.map((news: any) => {
          return (
            <div className="news-item">
              <div className="news-item-img">
                <img src={news?.image || ""} alt="" />
              </div>
              <div className="news-item-content">
                <p className="news-item-content-title">
                  {news?.title_post || ""}
                </p>
                <p className="news-item-content-time">
                  {news?.createdAt || ""}
                </p>
                <p>{news?.short_description || ""}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListNews;

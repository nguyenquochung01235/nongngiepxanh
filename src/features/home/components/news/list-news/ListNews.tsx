import React from "react";
import { listNews } from "../../../../../mock/news-data";
import "./list-news.scss";

type Props = {};

const ListNews = (props: Props) => {
  return (
    <div className="list-news">
      <h3 className="list-news-heading">Tất cả bài viết</h3>
      {listNews &&
        listNews.length > 0 &&
        listNews.map((news: any) => {
          return (
            <div className="news-item">
              <div className="news-item-img">
                <img src={news.image || ""} alt="" />
              </div>
              <div className="news-item-content">
                <p className="news-item-content-title">{news.title || ""}</p>
                <p className="news-item-content-time">{news.createdAt || ""}</p>
                <p>{news.description || ""}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListNews;

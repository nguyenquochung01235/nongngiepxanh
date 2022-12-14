import { Col, Row } from "antd";
import React from "react";
import "./top-news.scss";
type Props = {
  post?: any;
};

const TopNews = ({ post }: Props) => {
  return (
    <div className="top-news">
      <div className="top-news-list">
        <Row gutter={24}>
          <Col lg={18} md={18} sm={24} xs={24}>
            <div className="top-news-list__item">
              <Row gutter={0}>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                    src={post && post[0]?.image}
                    alt=""
                  />
                </Col>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  style={{
                    background: "rgb(2245,245,245)",
                    padding: "16px",
                    maxHeight: "300px",
                    overflow: "auto",
                  }}
                >
                  <div style={{ maxHeight: "140px", overflow: "hidden" }}>
                    <h2>{(post && post[0]?.title_post) || ""}</h2>
                  </div>
                  <span className="top-news-list__item-category">
                    Nông nghiệp 4.0
                  </span>
                  <p>{(post && post[0]?.short_description) || ""}</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={24}
            xs={24}
            style={{
              maxHeight: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div className="top-news-list__item">
              <Row gutter={12}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <img
                    style={{
                      marginBottom: "8px",
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                    }}
                    src={post && post[1]?.iamge}
                    alt=""
                  />
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <h2>{(post && post[1]?.title_post) || ""}</h2>
                  <span className="top-news-list__item-category">
                    {" "}
                    Nông nghiệp 4.0
                  </span>
                  <p>{(post && post[1]?.short_description) || ""}</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TopNews;

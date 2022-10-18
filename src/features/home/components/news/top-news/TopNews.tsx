import { Col, Row } from "antd";
import React from "react";
import "./top-news.scss";
type Props = {};

const TopNews = (props: Props) => {
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
                    src="https://t.ex-cdn.com/nongnghiep.vn/resize/600x360/files/bao_in/2022/10/08/18_57_5766_1-083124.jpeg"
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
                  <h2>Mô hình trồng lúa kết hợp nuôi tôm</h2>
                  <span className="top-news-list__item-category">
                    Nông nghiệp 4.0
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore, rerum neque velit architecto reiciendis tenetur
                    optio corporis laborum consectetur nobis cum, voluptas, in
                    nostrum similique. Perspiciatis inventore fugiat
                    necessitatibus quas!
                  </p>
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
                    src="https://t.ex-cdn.com/nongnghiep.vn/resize/600x360/files/bao_in/2022/10/08/18_57_5766_1-083124.jpeg"
                    alt=""
                  />
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <h2>Những món ăn không nên bỏ lỡ</h2>
                  <span className="top-news-list__item-category">Ẩm thực</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore, rerum neque velit architecto reiciendis tenetur
                  </p>
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

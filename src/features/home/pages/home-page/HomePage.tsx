import React from "react";
import HomePageHeader from "../../components/header/HomePageHeader";
import TopNews from "../../components/news/top-news/TopNews";
import "./home-page.scss";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <HomePageHeader></HomePageHeader>
      <div className="home-page-container">
        <TopNews></TopNews>
      </div>
    </>
  );
};

export default HomePage;

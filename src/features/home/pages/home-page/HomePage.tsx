import React from "react";
import HomePageHeader from "../../components/header/HomePageHeader";
import ListNews from "../../components/news/list-news/ListNews";
import TopNews from "../../components/news/top-news/TopNews";
import "./home-page.scss";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      
      <div className="home-page-container">
        <TopNews></TopNews>
        <br />
        <ListNews></ListNews>
      </div>
    </>
  );
};

export default HomePage;

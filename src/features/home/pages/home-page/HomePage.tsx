import { useQuery } from "@tanstack/react-query";
import React from "react";
import postApi from "../../../../api/post";
import HomePageHeader from "../../components/header/HomePageHeader";
import ListNews from "../../components/news/list-news/ListNews";
import TopNews from "../../components/news/top-news/TopNews";
import "./home-page.scss";

type Props = {};

const HomePage = (props: Props) => {
  const fetchAllPost = () => postApi.getAll({});
  const post = useQuery(["home/post/all"], fetchAllPost);
  console.log(post?.data);

  return (
    <>
      
      <div className="home-page-container">
        <TopNews post={post?.data?.data.slice(0, 2)}></TopNews>
        <br />
        <ListNews post={post?.data?.data.slice(2)}></ListNews>
      </div>
    </>
  );
};

export default HomePage;

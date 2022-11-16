import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

const HTXStorymanagement = (props: Props) => {
  const fetchStoryOfUser = () => {};
  const storyOfUser = useQuery(["story-of-user"], fetchStoryOfUser);
  return <div className="story-of-user"></div>;
};

export default HTXStorymanagement;

import { AnyArray } from "immer/dist/internal";
import React from "react";
import "./card.scss";

type Props = {
  children: any;
};

const Card = (props: Props) => {
  return <div className="card shadow-wrapper">{props.children}</div>;
};

export default Card;

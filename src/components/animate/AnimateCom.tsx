import React, { ReactComponentElement } from "react";
import { Animate } from "react-simple-animate";
type Props = {
  children: ReactComponentElement<any>;
};

const AnimateComp = (props: Props) => {
  return (
    <Animate
      play
      duration={0.5}
      start={{
        transform: "translateY(-100px)",
      }}
      end={{ transform: "translateY(0)" }}
    >
      {props.children}
    </Animate>
  );
};

export default AnimateComp;

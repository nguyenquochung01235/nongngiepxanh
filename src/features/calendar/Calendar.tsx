import { Scheduler } from "@aldabil/react-scheduler";
import React from "react";
import { EVENTS } from "./eventData";

type Props = {};

const Calendar = (props: Props) => {
  return (
    <Scheduler
      view="week"
      events={EVENTS}
      selectedDate={new Date(2021, 4, 5)}
    />
  );
};

export default Calendar;

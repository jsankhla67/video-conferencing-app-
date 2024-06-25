import CallList from "@/components/CallList";
import React from "react";

const Upcoming = () => {
  return (
    <div className="p-4">
      <h1 className="text-white text-4xl font-bold">Upcoming</h1>
      <CallList type="upcoming" />
    </div>
  );
};

export default Upcoming;

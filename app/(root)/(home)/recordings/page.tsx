import CallList from "@/components/CallList";
import React from "react";

const Recordings = () => {
  return (
    <div className="p-4">
      <h1 className="text-white text-4xl font-bold">Recording</h1>
      <CallList type="recordings" />
    </div>
  );
};

export default Recordings;

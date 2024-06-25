import CallList from "@/components/CallList";
import React from "react";

const Previous = () => {
  return (
    <div className="p-4">
      <h1 className="text-white text-4xl font-bold">Previous</h1>
      <CallList type="ended" />
    </div>
  );
};

export default Previous;

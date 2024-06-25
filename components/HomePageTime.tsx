"use client";
import React, { useState } from "react";

const HomePageTime = () => {
  const [now, setNow] = useState(new Date());

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  setTimeout(() => {
    setNow(new Date());
  }, 1000 * 60);

  return (
    <div className="relative w-full bg-gray-800 rounded-2xl flex flex-col gap-7 justify-center items-center h-[200px]">
      <p className="text-7xl font-bold max-sm:text-5xl">{time}</p>
      <p className="text-3xl text-red-1 font-semibold max-sm:text-2xl">
        {date}
      </p>
      {/* <UpcomingNotifier date={date} time={time} /> */}
    </div>
  );
};

export default HomePageTime;

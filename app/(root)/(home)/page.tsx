import HomePageTime from "@/components/HomePageTime";
import MeetingTypeList from "@/components/MeetingTypeList";
import UpcomingNotifier from "@/components/UpcomingNotifier";
import React from "react";

const Home = () => {



  return (
    <section className="flex flex-col size-full gap-16 text-white">
      <HomePageTime />

      <MeetingTypeList />
    </section>
  );
};

export default Home;

"use client";
import { useGetCalls } from "@/hooks/useGetHooks";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import React from "react";

const UpcomingNotifier = ({ date, time }: { date: string; time: string }) => {
  const { user, isLoaded } = useUser();

 

  const { upcomingCalls, isLoading } = useGetCalls();

  if (isLoading)
    return (
      <p className="absolute left-0 -bottom-9 flex justify-center items-center  bg-gray-800 p-3 px-5 rounded-b-2xl font-mono min-w-[200px]">
        <Loader2 />
      </p>
    );

  return (
    <p className="absolute left-0 -bottom-9 bg-gray-800 p-3 px-5 rounded-b-2xl font-mono ">
      {upcomingCalls.length > 0
        ? `Upcoming meeting on ${upcomingCalls[0]?.state?.startsAt?.toLocaleString()}`
        : "No upcoming meetings"}
    </p>
  );
};

export default UpcomingNotifier;

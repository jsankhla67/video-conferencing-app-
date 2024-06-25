//@ts-nocheck
"use client";
import { useGetCalls } from "@/hooks/useGetHooks";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { endedCalls, recordings, isLoading, upcomingCalls } = useGetCalls();

  const [callRecordings, setCallRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return callRecordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls";
      case "recordings":
        return "No call recordings";
      case "upcoming":
        return "No upcoming calls";
      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          recordings.map((meeting) => meeting.queryRecordings())
        );

        const recordingsData = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setCallRecordings(recordingsData);
      } catch (error) {
        toast({ title: "Try again later" });
      }
    };

    if (type === "recordings") fetchRecordings();
  }, [type, recordings, toast]);

  const calls = getCalls();
  const callsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2  py-4">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 26) ||
              meeting.filename?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`meeting/${meeting.id}`)
            }
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
          />
        ))
      ) : (
        <h1 className="text-gray-200 text-3xl">{callsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;

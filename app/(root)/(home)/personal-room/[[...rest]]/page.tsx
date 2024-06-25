"use client";

import PersonalRoomContents from "@/components/PersonalRoomContents";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const { call } = useGetCallById(meetingId!);
  const router = useRouter();

  const startMeeting = async () => {
    if (!client || !user) return;
    if (!call) {
      const newCall = client.call("default", meetingId!);
      newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting
  /${meetingId}?personal=true`;

  return (
    <section className="text-white flex size-full flex-col gap-10">
      <h1 className="text-white text-4xl font-bold">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 sl:max-w-[900px]">
        <PersonalRoomContents
          title="Topic"
          description={`${user?.firstName}'s meeting room`}
        />
        <PersonalRoomContents title="Meeting ID" description={`${meetingId}`} />
        <PersonalRoomContents title="Meeting Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-red-1" onClick={startMeeting}>
          Start Meeting
        </Button>
        <Button
          className="bg-red-2"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
            );
            toast({ title: "Link Copied" });
          }}
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;

"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and a time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw Error("Failed to initiate a call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
        toast({
          title: "Meeting created",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${callDetails?.id}`;

  return (
    <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
      <HomeCard
        img={"/icons/add-meeting.svg"}
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
        colorClass="hover:bg-red-900 border-red-900"
      />
      <HomeCard
        img={"/icons/join-meeting.svg"}
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
        colorClass="hover:bg-blue-900 border-blue-900"
      />
      <HomeCard
        img={"/icons/schedule.svg"}
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
        colorClass="hover:bg-yellow-700 border-yellow-700"
      />
      <HomeCard
        img={"/icons/Video.svg"}
        title="View Recordings"
        description="Meeting Recordings"
        handleClick={() => {
          router.push("/recordings");
        }}
        colorClass="hover:bg-green-900 border-green-900"
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title={"Create meeting"}
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-red-200">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-base text-normal leading-[22px] text-red-200">
              Select a data and time
            </label>
            <ReactDatePicker
              onChange={(date) => {
                setValues({ ...values, dateTime: date! });
              }}
              selected={values.dateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded bg-dark-2 p-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title={"Meeting Created"}
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            toast({ title: "Link Copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title={"Start an instant meeting"}
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title={"Type the link here"}
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Enter link here"
          className="border-none bg-red-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </div>
  );
};

export default MeetingTypeList;

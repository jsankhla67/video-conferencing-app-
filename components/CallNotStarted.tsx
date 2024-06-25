import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CallNotStarted = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-9">
      <h1 className="text-white text-4xl animate-pulse  max-md:text-lg">
        Meeting has not started yet
      </h1>
      <Button
        className="bg-red-1 text-white text-lg rounded  max-md:text-base"
        onClick={() => {
          router.push("/");
        }}
      >
        Go Back To Home
      </Button>
    </div>
  );
};

export default CallNotStarted;

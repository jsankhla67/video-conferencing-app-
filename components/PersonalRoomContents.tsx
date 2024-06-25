import React from "react";

const PersonalRoomContents = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full ">
      <h3 className="text-3xl font-semibold text-red-300 max-lg:text-xl max-md:text-lg">{title} :</h3>
      <h2 className="text-2xl font-semibold text-wrap  text-gray-300 max-lg:text-lg max-md:text-sm">{description}</h2>
    </div>
  );
};

export default PersonalRoomContents;

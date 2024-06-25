import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type HomeCardProps = {
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
  colorClass: string;
};

const HomeCard = ({
  img,
  title,
  description,
  handleClick,
  colorClass,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between items-start p-5  border-2 h-[200px] rounded-xl cursor-pointer transition-colors",
        colorClass
      )}
      onClick={handleClick}
    >
      <div className="relative h-[30px] w-[30px] p-3 flex justify-center items-center">
        <Image src={img} alt="meetings" fill />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;

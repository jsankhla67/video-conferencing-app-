"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();

  return (
    <section className="w-full max-w-[264px] sm:hidden ">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            alt="navigation"
            width={36}
            height={36}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-dark-1">
          <Link href={"/"} className="flex items-center gap-3">
            <Image
              src={"/icons/logo.svg"}
              width={32}
              height={32}
              alt="Zoom Logo"
              className="max-sm:size-10"
            />
            <h1 className="text-white font-bold text-2xl max-sm:hidden">
              Video Conferencing
            </h1>
          </Link>
          <div className="flex flex-col h-[calc(100vh-72px)] justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathName === link.route;
                  return (
                    <SheetClose key={link.label} asChild>
                      <Link
                        href={link.route}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-full w-full max-w-60",
                          {
                            "bg-red-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;

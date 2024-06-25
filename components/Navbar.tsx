import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-7 lg:px-10">
      <Link href={"/"} className="flex items-center gap-3">
        <Image
          src={"/icons/logo.svg"}
          width={32}
          height={32}
          alt="Zoom Logo"
          className="max-sm:size-10"
        />
        <h1 className="text-white font-bold text-2xl max-sm:hidden">LOOM</h1>
      </Link>
      <div className="flex justify-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;

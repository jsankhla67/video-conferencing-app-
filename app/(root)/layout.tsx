import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "LOOM",
  description: "Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StreamVideoProvider>
      <main>{children}</main>;
    </StreamVideoProvider>
  );
};

export default RootLayout;

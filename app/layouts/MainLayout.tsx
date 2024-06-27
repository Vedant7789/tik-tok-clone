import React from "react";
import SideNavMain from "./includes/SideNavMain";
import TopNav from "./includes/TopNav";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <TopNav />
      <div className={`flex md:gap-6 w-full items-start relative mt-12 z-[1]`}>
        <SideNavMain />
        {children}
      </div>
    </>
  );
}

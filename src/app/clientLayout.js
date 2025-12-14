"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/UI/Navbar";
import useIsMobile from "@/hooks/useIsMobile";
export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  // Paths where navbar should NOT show
  const hideNavbarPaths = ["/", "/login", "/signup"]; 

  const shouldHideNavbar = hideNavbarPaths.includes(pathname);

  return (
    <>
      <div className={`
          transition-all
          ${isMobile ? "pb-[20px] pl-[0px]" : "pl-[10px] pb-[0px]"}
        `}>
      {!shouldHideNavbar && <Navbar />}
      {children}
      </div>
    </>
  );
}


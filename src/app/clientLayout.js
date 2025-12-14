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

  // Paths where padding should be applied
  const paddedPaths = ["/dashboard", "/tasks"];
  const shouldApplyPadding = paddedPaths.includes(pathname);

  return (
    <>
      <div className={`
          transition-all
          ${shouldApplyPadding ? (isMobile ? "pb-[50px]" : "pl-[10px]") : ""}
        `}
      >
        {!shouldHideNavbar && <Navbar />}
        {children}
      </div>
    </>
  );
}

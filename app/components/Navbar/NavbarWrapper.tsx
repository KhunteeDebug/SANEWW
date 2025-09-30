"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // path ที่ไม่อยากให้มี Navbar
  const noNavbarPages = ["/login", "/register", "/admin/login"];
  const ShownavbarAdmin = ["/admin", "/admin/addpc", "/admin/confirm_pc", "/admin/customer", "/admin/home", "/admin/pcmonitor", "/admin/pcwalkin", , "/admin/randomID"];
  const hideNavbar = noNavbarPages.includes(pathname);
  const shownavad = ShownavbarAdmin.includes(pathname);

  if (hideNavbar) {
    return null;
  }  else {
    return <Navbar />;
  }


}

"use client";
import Link from "next/link";
import { useState } from "react";
import "./navbar.css";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="">
         navbar
      </nav>
    </>
  );
}

export default Navbar;

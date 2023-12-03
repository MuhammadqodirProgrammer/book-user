import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FamousCourses from "@/components/FamousCourses/FamousCourses";
import NewCourses from "@/components/NewCourses/NewCourses";

export default function Layout({ children }: any) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="inner_container mt-[12vh] min-h-[78vh] ">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

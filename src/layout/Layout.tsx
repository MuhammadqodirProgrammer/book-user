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
      <div>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

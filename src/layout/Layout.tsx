import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout({ children }: any) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>{children}</div>
      <div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

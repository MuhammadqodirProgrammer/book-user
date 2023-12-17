import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Cookies from 'universal-cookie';
import apiRoot from "@/app/api/api";

export default function Layout({ children }: any) {
  const cookies = new Cookies();


	useEffect(() => {
		const getKey = async () => {
			const key =cookies.get("browser_id") 
			// const isKey =localStorage.getItem("isKey")
			if(!key){
				const resp = await apiRoot.get(`check/key`);
				console.log(resp, 'response');
				if(resp?.status ==201){
					// localStorage.setItem("isKey" ,resp?.data?.key)
					cookies.set("browser_id" ,resp?.data?.key ,{ maxAge: 365 * 24 * 60 * 60 * 1000 } )
					// res.cookie('mykey', myKey, { maxAge: 365 * 24 * 60 * 60 * 1000 });
				}
			}
			console.log(key, "my key");
		};
		getKey()
	}, []);

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

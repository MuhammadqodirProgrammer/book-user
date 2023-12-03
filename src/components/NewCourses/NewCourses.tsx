"use client";
import Link from "next/link";
import Image from "next/image";
import BgImage from "public/images/react-native.webp";

import React, { useEffect, useState } from "react";
import apiRoot, { baseURL, baseURLImg } from "@/app/api/api";
import { VideoSkeleton } from "../Skeleton/Skeleton";

const NewCourses = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}/courses?page=1`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-wrap gap-5">
      {data.length ? (data.map((el: any) => {
        return (
          <>
            <Link
              href="/singleCourse"
              className="flex flex-col relative w-full lg:w-[31%] bg-[white] dark:bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto"
              onClick={() => {
                localStorage.setItem("id", el.id);
              }}
            >
              <Image
                className="min-h-[250px] h-full w-full object-cover rounded-md transition ease-in-out hover:opacity-75"
                src={`${baseURLImg}/${el.imagePath}`}
                alt="Picture of the course"
                width={"1000"}
                height={"1000"}
              />
              <h5 className="pt-2 text-sm text-newCourcesPreTitleColor text-center uppercase">
                mobil dastur
              </h5>
              <h6 className="pt-3 pb-3 font-medium text-[black] dark:text-white text-center">
                {el.name}
              </h6>
              <hr className="h-1 w-full bg-CoursesHr" />
              <div className="flex justify-between pt-5 items-center">
                <div className="flex gap-3 text-[black] dark:text-white items-center">
                  <Link
                    href="/singleCourse"
                    className=" text-purple dark:text-newCourcesBtn border border-solid border-newCourcesBtn font-medium px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover"
                  >
                    batafsil
                  </Link>
                </div>
                <div className="flex gap-3  text-[black] dark:text-white items-center">
                  <p className="text-sm line-through">{el.price}</p>
                  <p className="font-bold">Bepul</p>
                </div>
              </div>
            </Link>
          </>
        );
      })) : <div>
        
        <VideoSkeleton/>
        </div>}
    </div>
  );
};

export default NewCourses;

"use client";
import Link from "next/link";
import Image from "next/image";
import BgImage from "public/images/js.webp";
import profileImg from "public/images/profile.jpg";
import { FaBirthdayCake } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { apiRoot, baseMediaUrl, baseURLImg, baseURL } from "../api/api";
import { SkeletonDemo } from "@/components/Skeleton/Skeleton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Modal } from "@/components/Modal/Modal";
import { Pagination } from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation"; // Import from 'next/router' instead of 'next/navigation'

export default function Page() {
  const [data, setData] = useState<any>([]);
  const [OneData, setOneData] = useState<any>([]);
  const [activePage, setActivePage] = useState(1);

  // Modals state
  const [Create, setCreate] = useState<any>(false);
  const [EditModal, setEditModal] = useState<any>(false);
  const [DeleteModal, setDeleteModal] = useState<any>(false);
  const [DeleteId, setDeleteId] = useState<any>(false);
  // media state
  const [ImageUrl, setImageUrl] = useState<any>("");

  // Refs
  const nameRef = useRef<any>();
  const birthdayRef = useRef<any>();
  const stateRef = useRef<any>();

  const editnameRef = useRef<any>();
  const editbirthdayRef = useRef<any>();
  const editstateRef = useRef<any>();

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const getFunc = async () => {
    const resp = await apiRoot.get(`author?page=${activePage}&pageSize=6`);

    if (resp?.status === 200) {
      setData(resp?.data);
    }
  };

  const getOneFunc = async (id: any) => {
    const resp = await apiRoot.get(`author/${id}`);
    setEditModal(true);
    setDeleteId(id);
    console.log(resp?.data, "data");
    if (resp?.status === 200) {
      // setData(resp?.data);
      setOneData(resp?.data?.data);
    }
  };

  useEffect(() => {
    getFunc();
    console.log(data, "dataaaaaaaaaaaaaaa");
  }, [activePage]);

  return (
    <>
      <div className="flex items-center  justify-center  gap-[30px] mb-[15px] pt-24">
        <h3 className="   text-[50px] font-bold text-white">Authors </h3>
      </div>

      <div className="grid px-2 max-w-[1240px] mx-auto lg:grid-cols-3 max-lg:grid-cols-2  max-sm:grid-cols-1  gap-3 py-3">
        {data?.data?.length ? (
          data?.data?.map((item: any) => (
            <div
              key={item?.id}
              className="flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto"
            >
              <Image
                className="h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75"
                src={`${baseMediaUrl}/images/${item?.author_image}`}
                alt="Picture of the author"
                width={1000}
                height={1000}
              />
              <h6 className="pt-[10px] text-[22px] font-bold text-black dark:text-white">
                {item?.full_name?.length > 25
                  ? item?.full_name?.slice(0, 23) + ".."
                  : item?.full_name}
              </h6>
              <div className="flex gap-[6px] py-[15px]">
                <span className="flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor">
                  <FaBirthdayCake size={20} />
                  {item?.birthday?.slice(0, 10)} {item?.state_birth}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex gap-[5px] mb-3 items-center text-[15px] text-black dark:text-famousCourcesDescsColor">
                  <FaBook size={20} />
                  {item?.books_count}
                </span>
              </div>
              <hr className="h-1 w-full bg-CoursesHr" />
              <div className="flex justify-between items-center pt-5">
                <div className="flex gap-[10px] items-center text-black dark:text-white">
                  <p>Created:</p>
                  {item?.createdAt?.slice(0, 10)}
                </div>
                <Link
                  href={`/singleauthor`}
                  className="flex gap-[10px] items-center text-black dark:text-white"
                  onClick={() => {
                    localStorage.setItem("author_id", item.id);
                  }}
                >
                  <FaArrowRight size={20} className=" my_animate  " />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <SkeletonDemo />
        )}
      </div>
<div className="px-2 max-w-[1240px] mx-auto">

      {data?.data?.length && (
        <Pagination
          activePage={activePage}
          setActivePage={setActivePage}
          totalPage={data?.pageCount}
        />
      )}
</div>
    </>
  );
}

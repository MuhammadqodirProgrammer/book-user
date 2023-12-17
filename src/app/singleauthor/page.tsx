"use client";
import Image from "next/image";
import { FaBirthdayCake } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { SkeletonDemo } from "@/components/Skeleton/Skeleton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Modal } from "@/components/Modal/Modal";
import { apiRoot, baseMediaUrl } from "@/app/api/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
export default function Page() {
  const [data, setData] = useState<any>([]);
  const [OneData, setOneData] = useState<any>([]);
  const id = localStorage.getItem("author_id");
  const router = useRouter();
  // Modals state
  const [EditModal, setEditModal] = useState<any>(false);
  const [DeleteModal, setDeleteModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  // media state
  const [ImageUrl, setImageUrl] = useState<any>("");

  // Refs

  const editnameRef = useRef<any>();
  const editbirthdayRef = useRef<any>();
  const editstateRef = useRef<any>();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getFunc = async () => {
    const resp = await apiRoot.get(`author/${id}`);
    console.log(resp?.data, "get func");

    if (resp?.status === 200) {
      setData(resp?.data?.data);
      setIsLoading(true);
      console.log(resp?.data, "data");
    }
  };

  useEffect(() => {
    getFunc();
  }, []);

  return (
    <>
      <div className="flex  max-[550px]:flex-col  justify-center items-center   gap-[30px] mb-[15px] pt-24">
        <button
          className="bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/author")}
        >
          <FaArrowLeftLong size={15} className=" my_animate  " />
          Back
        </button>
        <h3 className=" text-[22px]  text-white  text-center ">
          More about the author{" "}
        </h3>
      </div>

      {isLoading ? (
        <div
          key={data?.id}
          className="flex px-2 max-w-[1240px] mx-auto  max-sm:flex-wrap gap-3 relative dark:bg-famousCourcesBg bg-slate-300    text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4  w-[100%] max-lg:m-auto"
        >
          <Image
            className="h-[400px] max-sm:h-[280px]  max-sm:w-[100%]  w-[50%] object-cover rounded-lg transition ease-in-out hover:opacity-75"
            src={`${baseMediaUrl}/images/${data?.author_image}`}
            alt="Picture of the author"
            width={1000}
            height={1000}
          />
          <div className="max-sm:w-[100%] w-[50%] ">
            <h6 className="pt-[10px] text-[22px] font-bold  text-white">
              {data?.full_name}
            </h6>
            <div className="flex gap-[6px] py-[15px]">
              <span className="flex gap-[5px] items-center text-[15px]  dark:text-famousCourcesDescsColor">
                <FaBirthdayCake size={20} />
                {data?.birthday?.slice(0, 10)} {data?.state_birth}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex gap-[5px] mb-3 items-center text-[15px]  dark:text-famousCourcesDescsColor">
                <FaBook size={20} />
                {data?.books?.length}
              </span>
            </div>

            <div className="flex gap-[10px] items-center  text-white">
              <p>Created:</p>
              {data?.createdAt?.slice(0, 10)}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <h3 className=" text-[22px] my-3 text-white  text-center ">
        Author books{" "}
      </h3>
      <div className="grid lg:grid-cols-3   max-lg:grid-cols-2  mb-3 max-sm:grid-cols-1  gap-3">
        {data?.books?.length
          ? data?.books.map((item: any) => (
              <div
                key={item?.id}
                className="flex flex-col relative dark:bg-famousCourcesBg bg-slate-300    text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto"
              >
                <Image
                  className="h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75"
                  src={`${baseMediaUrl}/images/${item?.book_image}`}
                  alt="Picture of the author"
                  width={1000}
                  height={1000}
                />
                <h6 className="pt-[10px] text-[22px] font-bold  text-white">
                  {item?.book_title}
                </h6>
                <h6 className="pt-[10px] text-[16px] font-bold  text-white mb-2">
                  {item?.book_description?.length > 45
                    ? item?.book_description?.slice(0, 43) + ".."
                    : item?.book_description}
                </h6>

                <div className="flex justify-between items-center">
                  {item?.book_audion && (
                    <audio
                      controls
                      src={`${baseMediaUrl}audios/${item?.book_audio}`}
                      className=" mb-3 border-[2px]  h-[40px] border-dotted rounded-full border-mainColor "
                    >
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                  )}
                </div>

                <hr className="h-1 w-full bg-CoursesHr" />
                <div className="flex justify-between items-center pt-5">
                  <div className="flex gap-[10px] items-center  text-white">
                    <p>Created:</p>
                    {item?.createdAt?.slice(0, 10)}
                  </div>
                  <span className="flex gap-[5px] items-center text-[15px]  dark:text-famousCourcesDescsColor">
                    <IoMdEye size={20} />
                    {item?.number_view}
                  </span>
                </div>
              </div>
            ))
          : "kitoblar hali qoshilmagan☹"}
      </div>
    </>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import BgImage from "public/images/js.webp";
import profileImg from "public/images/profile.jpg";
import { FaBirthdayCake } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { baseURL, baseURLImg, baseMediaUrl, apiRoot } from "../api/api";
import { SkeletonDemo } from "@/components/Skeleton/Skeleton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { useRouter } from "next/navigation"; // Import from 'next/router' instead of 'next/navigation'

import { Pagination } from "@/components/Pagination/Pagination";
import Cookies from "universal-cookie";
import { FileModal, Modal } from "@/components/Modal/Modal";

const cookies = new Cookies();
export default function Page() {
  const [data, setData] = useState<any>([]);
  const [OneData, setOneData] = useState<any>([]);
  const [AuthorData, setAuthorData] = useState<any>([]);
  const [CategoryData, setCategoryData] = useState<any>([]);
  const [SubCategoryData, setSubCategoryData] = useState<any>([]);
  const [activePage, setActivePage] = useState(1);

  // Modals state
  const [Create, setCreate] = useState<any>(false);
  const [EditModal, setEditModal] = useState<any>(false);
  const [DeleteModal, setDeleteModal] = useState<any>(false);
  const [DeleteId, setDeleteId] = useState<any>(false);
  const [ViewModal, setViewModal] = useState<any>(false);
  // media state
  const [ImageUrl, setImageUrl] = useState<any>("");
  const [AudioUrl, setAudioUrl] = useState<any>("");
  const [FileUrl, setFileUrl] = useState<any>("");
  const [editImageUrl, setEditImageUrl] = useState<any>("");
  const [editAudioUrl, setEditAudioUrl] = useState<any>("");
  const [editFileUrl, setEditFileUrl] = useState<any>("");
  const [OneId, setOneId] = useState<any>("");
  const [embedUrl, setEmbedUrl] = useState<any>("");

  // Refs

  // create
  const stateRef = useRef<any>();
  const book_titleRef = useRef<any>();
  const book_descriptionRef = useRef<any>();

  const date_writtenRef = useRef<any>();
  const category_idRef = useRef<any>();
  const author_idRef = useRef<any>();
  const subcategory_idRef = useRef<any>();

  // edit
  const editstateRef = useRef<any>();
  const editbook_titleRef = useRef<any>();
  const editbook_descriptionRef = useRef<any>();
  const editdate_writtenRef = useRef<any>();
  const editcategory_idRef = useRef<any>();
  const editauthor_idRef = useRef<any>();
  const editsubcategory_idRef = useRef<any>();

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, []);
  const getSelectData = async () => {
    const author = await apiRoot.get(`author?page=${1}&pageSize=50`);
    const category = await apiRoot.get(`category?page=${1}&pageSize=90`);
    const subcategory = await apiRoot.get(`subcategory`);
    console.log(author?.data?.data, "author");

    if (author?.status === 200) {
      setAuthorData(author?.data?.data);
      setCategoryData(category?.data?.data);
      setSubCategoryData(subcategory?.data);
    }
  };

  //upload funcs for  create

  const getFunc = async () => {
    const resp = await apiRoot.get(`books?page=${activePage}&pageSize=6`);
    console.log(resp, "response");

    if (resp?.status === 200) {
      setData(resp?.data);
    }
  };

  const getOneFunc = async (id: any) => {
    setEditModal(true);
    const resp = await apiRoot.get(`books/${id}`);
    setOneId(id);
    console.log(resp?.data, "data oneeeeeeeeeeeeeeeeeeeeeeee");
    if (resp?.status === 200) {
      // setData(resp?.data);
      setOneData(resp?.data);
    }
  };
  type createType = {
    book_title: any;
    book_description: any;
    date_written: any;
    category_id: any;
    author_id: any;
    subcategory_id: any;
    book_file: any;
    book_image: any;
    book_audio?: any;
  };

  const checkView = async (book_id: any) => {
    const key = cookies.get("browser_id");
    try {
      const resp: any = await apiRoot.get(`check/view/${book_id}`, {
        headers: {
          browser_id: key,
        },
      });
      console.log(key, "key resp");
      console.log(resp, "check resp");
    } catch (error) {
      console.error("Tekshirishda xato:", error);
    }
  };

  useEffect(() => {
    getFunc();
  }, [activePage]);
  useEffect(() => {
    getSelectData();
  }, []);

  return (
    <>
      <div className="flex items-center  justify-center  gap-[30px] mb-[15px] ">
        <h3 className=" text-[50px] font-bold text-white pt-20">Books </h3>
      </div>

      <div className="grid lg:grid-cols-3 max-lg:grid-cols-2  max-sm:grid-cols-1  gap-3 py-3">
        {data?.data?.length ? (
          data?.data?.map((item: any) => (
            <div
              key={item?.id}
              className="flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto"
            >
              <Image
                className="h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75"
                src={`${baseMediaUrl}/images/${item?.book_image}`}
                alt="Picture of the book"
                width={1000}
                height={1000}
              />
              <h6 className="pt-[10px] text-[22px] font-bold text-black dark:text-white">
                {item?.book_title}
              </h6>

              <h6 className="pt-[10px] text-[16px] font-bold text-black dark:text-white">
                {item?.book_description?.length > 85
                  ? item?.book_description?.slice(0, 82) + ".."
                  : item?.book_description}
              </h6>

              <div className="flex justify-between items-center my-2">
                {item?.book_audio && (
                  <audio
                    controls
                    onPlay={() => checkView(item?.id)}
                    src={`${baseMediaUrl}audios/${item?.book_audio}`}
                    className=" mb-3 border-[2px]  h-[34px] border-dotted rounded-full border-mainColor "
                  >
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                )}
              </div>

              <h3>
                <a
                  onClick={() => checkView(item?.id)}
                  target="_blank"
                  className=" text-[18px] text-mainColor  font-bold  cursor-pointer  "
                  href={`${baseMediaUrl}/files/${item?.book_file}`}
                >
                  Download
                </a>{" "}
                the file or{" "}
                <span
                  className="text-[18px] text-mainColor  font-bold  cursor-pointer "
                  onClick={() => {
                    setEmbedUrl(item?.book_file);
                    checkView(item?.id);
                    setViewModal(true);
                  }}
                >
                  View
                </span>{" "}
                here
              </h3>

              <div className="flex justify-between items-center  py-[15px]">
                <span className="flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor">
                  <IoMdEye size={20} />
                  {item?.number_view}
                </span>
              </div>
              <hr className="h-1 w-full bg-CoursesHr" />
              <div className="flex justify-between items-center pt-5">
                <div className="flex gap-[10px] items-center text-black dark:text-white">
                  <p>Created:</p>
                  {item?.createdAt?.slice(0, 10)}
                </div>
                <Link
                  href={`/singlebook`}
                  className="flex gap-[10px] items-center text-black dark:text-white"
                  onClick={() => {
                    localStorage.setItem("book_id", item.id);
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

      {data?.data?.length && (
        <Pagination
          activePage={activePage}
          setActivePage={setActivePage}
          totalPage={data?.pageCount}
        />
      )}
      <FileModal
        width={" w-[85%] md:w-[600px] "}
        title={"Delete Book"}
        modal={ViewModal}
        setModal={setViewModal}
      >
        <embed
          src={`${baseMediaUrl}/files/${embedUrl}`}
          type="application/pdf"
          width="100%"
          className="h-[90vh]"
        />
      </FileModal>
      {/* create modal  */}
    </>
  );
}

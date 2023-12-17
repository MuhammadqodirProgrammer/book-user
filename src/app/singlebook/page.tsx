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
import { apiRoot, baseMediaUrl, baseURL } from "@/app/api/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import Cookies from 'universal-cookie';

export default function Page() {
  const [data, setData] = useState<any>([]);
  const [OneData, setOneData] = useState<any>([]);
  const id = localStorage.getItem("book_id");
  const router = useRouter();
  const cookies = new Cookies();

  // Modals state
  const [EditModal, setEditModal] = useState<any>(false);
  const [DeleteModal, setDeleteModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [AuthorData, setAuthorData] = useState<any>([]);
  const [CategoryData, setCategoryData] = useState<any>([]);
  const [SubCategoryData, setSubCategoryData] = useState<any>([]);
  const [editImageUrl, setEditImageUrl] = useState<any>("");
  const [editAudioUrl, setEditAudioUrl] = useState<any>("");
  const [editFileUrl, setEditFileUrl] = useState<any>("");
  // media state
  const [ImageUrl, setImageUrl] = useState<any>("");

  // Refs

  // edit
  const editstateRef = useRef<any>();
  const editbook_titleRef = useRef<any>();
  const editbook_descriptionRef = useRef<any>();
  const editstate_birthRef = useRef<any>();
  const editdate_writtenRef = useRef<any>();
  const editcategory_idRef = useRef<any>();
  const editauthor_idRef = useRef<any>();
  const editsubcategory_idRef = useRef<any>();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  //upload funcs for  edit

  const getFunc = async () => {
    const resp = await apiRoot.get(`books/${id}`);
    console.log(resp?.data, "get func");

    if (resp?.status === 200) {
      setData(resp?.data);
      setIsLoading(true);
    }
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

  function generateRandomHexColor() {
    var hexDigits = "0123456789ABCDEF";
    var color = "";
    for (var i = 0; i < 6; i++) {
      color += hexDigits[Math.floor(Math.random() * 16)];
    }
    return color;
  }
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
  useEffect(() => {
    getFunc();
    getSelectData();
  }, []);

  return (
    <>
      <div className="flex  max-[550px]:flex-col  justify-center items-center   gap-[30px] mb-[15px] pt-24 ">
        <button
          className="bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/books")}
        >
          <FaArrowLeftLong size={15} className=" my_animate  " />
          Back
        </button>
        <h3 className=" text-[22px]  text-white  text-center ">
          More about the book{" "}
        </h3>
      </div>

      {isLoading ? (
        <div
          key={data?.id}
          className="flex px-2 max-w-[1240px] mx-auto max-sm:flex-wrap gap-3 relative dark:bg-famousCourcesBg bg-slate-300    text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4  w-[100%] max-lg:m-auto"
        >
          <Image
            className="h-[420px] max-sm:h-[280px]  max-sm:w-[100%]  w-[50%] object-cover rounded-lg transition ease-in-out hover:opacity-75"
            src={`${baseMediaUrl}/images/${data?.book_image}`}
            alt="Picture of the author"
            width={1000}
            height={1000}
          />
          <div className="max-sm:w-[100%] w-[50%] ">
            <h6 className="pt-[10px] text-[22px] font-bold  text-white">
              {data?.book_title}
            </h6>
            <h6 className="pt-[10px] text-[20px] font-bold  text-white">
              {data?.category?.category_name},{" "}
              {data?.subcategory?.subcategory_name}
            </h6>
            <h6 className="pt-[10px] text-[16px] font-bold  text-white max-h-[180px] overflow-y-scroll ">
              {data?.book_description}
            </h6>

            <div className="flex gap-[6px] py-[15px] items-center ">
              <span className="flex gap-[5px]  items-center text-[15px]  dark:text-famousCourcesDescsColor">
                <FaPencil size={20} />
                {data?.author?.full_name}
              </span>
              <span className="flex gap-[5px] items-center text-[15px]  dark:text-famousCourcesDescsColor">
                {data?.date_written?.slice(0, 10)}
              </span>
            </div>
            {data?.book_audio && (
              <audio
                controls
                src={`${baseMediaUrl}audios/${data?.book_audio}`}
                onPlay={() => checkView(data?.id)}
                className=" mb-3 border-[2px]  h-[40px] border-dotted rounded-full border-mainColor "
              >
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            )}

            <div className="flex gap-[10px] items-center  text-white">
              <p>Created:</p>
              {data?.createdAt?.slice(0, 10)}
            </div>
            <div className="flex  items-center justify-between mt-2">
              <div className="flex gap-[5px] items-center text-[15px]  dark:text-famousCourcesDescsColor">
                <IoMdEye size={20} />
                <p>{data?.number_view}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <h3 className=" text-[22px] my-3 text-white  text-center ">
        Book file{" "}
      </h3>
      <embed
        src={`${baseMediaUrl}/files/${data?.book_file}`}
        type="application/pdf"
        width="100%"
        className="h-[50vh]"
        onClick={ () => checkView(data?.id)}
      />
      <h3 className=" text-[22px] my-3 text-white  text-center ">
        Book commnets
      </h3>

      {data?.comments?.length ? (
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 px-2 max-w-[1240px] mx-auto">
          {data?.comments.map((item: any) => (
            <div
              key={item?.id}
              className="flex items-start mb-4 cursor-pointer hover:bg-gray-400 p-2 rounded-md"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image
                  src={`https://placehold.co/200x/001/${
                    generateRandomHexColor() || "fff"
                  }.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white   ">
                  {" "}
                  {item?.user?.full_name}
                </h2>
                <p className="text-gray-600">{item?.message}</p>
                <p className="text-gray-600 text-[12px] ">
                  {item?.createdAt?.slice(11, 19)}{" "}
                  {item?.createdAt?.slice(0, 10)}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "commnetlar yoq ☹"
      )}
    </>
  );
}

import Link from "next/link";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { item } from "./item";

export default function Resources() {
  return (
    <div className="w-full md:container md:px-5 mx-auto">
      <div className=" ">
        <h1 className="text-[36px] text-black dark:text-white font-semibold">
          <span className="text-mainColor">Foydali</span> Manbalar
        </h1>
        <p className="text-black dark:text-white">
          ITga oid ma'lumotlar va platformamizdagi loyihalarning kod manbalari.
        </p>
        <div className="flex flex-wrap gap-3  mt-5 ">
          {item.map((el) => {
            return (
              <>
                <div className="p-3 bg-[white] dark:bg-cardColor w-full lg:max-w-[31%] h-[220px]  rounded-lg shadow border border-[#eee]">
                  <div className="bg-mainColor rounded-full m-2 p-[15px] h-[60px] w-[60px]">
                    <svg
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="currentColor"
                      fill="#fff"
                      stroke-width="0"
                      role="img"
                      viewBox="0 0 24 24"
                      focusable="false"
                      className="chakra-icon css-7viacf"
                      height="30px"
                      width="30px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title></title>
                      <path d="M11.466 0c.88 1.423-.28 3.306-1.207 4.358-.899 1.02-1.992 1.873-2.985 2.8-1.066.996-2.091 2.044-2.967 3.213-1.753 2.339-2.827 5.28-2.038 8.199.788 2.916 3.314 4.772 6.167 5.429-1.44-.622-2.786-2.203-2.79-3.82-.003-1.765 1.115-3.262 2.505-4.246-.167.632-.258 1.21.155 1.774a1.68 1.68 0 0 0 1.696.642c1.487-.326 1.556-1.96.674-2.914-.872-.943-1.715-2.009-1.384-3.377.167-.685.588-1.328 1.121-1.787-.41 1.078.755 2.14 1.523 2.67 1.332.918 2.793 1.612 4.017 2.688 1.288 1.132 2.24 2.661 2.047 4.435-.208 1.923-1.736 3.26-3.45 3.936 3.622-.8 7.365-3.61 7.44-7.627.093-3.032-1.903-5.717-5.158-7.384.19.48.074.697-.058.924-.55.944-2.082 1.152-2.835.184-1.205-1.548.025-3.216.197-4.855.215-2.055-1.073-4.049-2.67-5.242z"></path>
                    </svg>
                  </div>
                  <p className="text-[black] dark:text-white my-6">{el.name}</p>
                  <Link target="_blank" href={`${el.link}`}>
                    <button className="flex  hover:bg-[#524561] items-center gap-3 justify-center text-mainColor font-semibold border border-mainColor p-3 rounded-md mt-3 w-full">
                      Yuklab olish <AiOutlineCloudUpload />
                    </button>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

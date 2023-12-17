"use client";
import { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation"
import { IoMdCloudUpload } from 'react-icons/io';
import { FaArrowLeftLong } from 'react-icons/fa6';

import toast, { Toaster } from "react-hot-toast";
const notify = () => toast.success("Successfully registered");
const notify2 = () => toast.error("Somthing went wrong try again!");

export default function Register() {
  const [ImgUrl, setImgUrl] = useState<any>("");
  const emailRef = useRef<any>(null);
  const fnameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const router = useRouter()
 const uploadImage = async (file:any) => {
    const token =	typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
  
      const uploadResponse = await fetch("https://library-backend.uz/api/upload/image", {
        headers:{
          "Authorization" :`${token}`
        },
        method: "POST",
        body: formData,
  
      });
  
      const uploadedFile = await uploadResponse.json();
      console.log(uploadedFile ,"file");
      setImgUrl(uploadedFile.image)
    }
  

  };
  async function handleSubmit(evt: any) {
    evt.preventDefault();

    const data ={
      full_name:fnameRef?.current?.value,
      user_image:ImgUrl,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value
    }
    if(!ImgUrl){
      alert(" Iltiomos rasimingizni kiriting !")
    }
    try {
      let response = await axios.post(
        "https://library-backend.uz/api/auth/register",
        data
      );
      console.log(response , "resp");

      if (response.status == 201) {
        notify();
        const userName =((fnameRef?.current.value).slice(0,1)).toUpperCase();
        if (typeof window !== "undefined") {
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("userName", userName);
        }
        console.log(userName ,"name")
        router.push("/");
      } else {
        notify2();
      }
    } catch {
      notify2();
    }
  }
  return (
    <>

<main className=" h-screen fixed z-50  w-[100%] m-auto pt-3   bg-gradient-to-br from-slate-900 to-teal-700">
      <div className="w-full flex justify-center items-center gap-0 md:gap-5">
       
      <div className="w-[95%] mx-auto md:w-[50%] mt-[50px] max-[500px]:mt-[30px] p-5 rounded-lg bg-[#f7fafc] dark:bg-[#171923] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex items-center justify-center gap-3 mb-2">
        <button
					className='bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white font-bold py-1 px-4 rounded'
					onClick={() => router.push('/books')}
				>
					<FaArrowLeftLong size={15} className=' my_animate  ' />
					Back 
				</button>
          <h2 className="text-[2.25rem] text-black dark:text-white font-bold flex items-center max-[500px]:text-[26px] ">
            Ro'yhatdan o'tish <span className="text-[#1a7745]">!</span>
          </h2>
        </div>
          <p className="text-black dark:text-white">
            Akauntingiz mavjudmi? {"  "}
            <Link
              href="/auth/login"
              className="underline cursor-pointer text-[#319795]"
            >
              Dasturga kiring
            </Link>
          </p>
          <form className="pt-2" onSubmit={handleSubmit}>

          <label
							htmlFor='audio_file'
							title='Bosing va Rasm yuklang!'
							className=' relative flex flex-col items-center justify-center w-full h-[50px]  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 mb-4 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-3'>
								<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload img</span>
									
								</p>
							</div>
							<input
								id='audio_file'
								type='file'
								className='hidden'
								onChange={(evnt: any) => uploadImage(evnt?.target?.files?.[0])}
							/>
						</label>


            <input
              type="email"
              id="email"
              placeholder="Email manzilingiz"
              className=" rounded-md bg-transparent p-4 color-white text-[black] dark:text-white  outline-ContactInputBorder outline outline-2 transition-all ease-in-out  focus:outline-newCourcesPreTitleColor focus:outline focus:outline-2 mb-4 w-full"
              autoComplete="off"
              ref={emailRef}
            />
            <input
              type="text"
              id="fname"
              placeholder="Toliq Ismingiz"
              className=" rounded-md bg-transparent p-4 color-white text-[black] dark:text-white  outline-ContactInputBorder outline outline-2 transition-all ease-in-out  focus:outline-newCourcesPreTitleColor focus:outline focus:outline-2 mb-4 w-full"
              autoComplete="off"
              ref={fnameRef}
            />
        
            <input
              type="password"
              id="email"
              placeholder="Parolingiz"
              className=" rounded-md bg-transparent p-4 color-white text-[black] dark:text-white  outline-ContactInputBorder outline outline-2 transition-all ease-in-out  focus:outline-newCourcesPreTitleColor focus:outline focus:outline-2 mb-4 w-full"
              autoComplete="off"
              ref={passwordRef}
            />
            <div className="flex gap-3 pb-5">
              <input type="checkbox" checked />
              <p className="text-[black] dark:text-white">Eslab qolish</p>
            </div>
            <button
              type="submit"
              className="w-[100%] py-4 font-medium bg text-[17px] bg-mainColor cursor-pointer border-none rounded-md transition ease-in-out hover:bg-ContactButtonHover"
            >
              Ro'yhatdan o'tish
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </main>
    
    </>
  );
}

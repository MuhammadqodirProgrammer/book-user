"use client";
import { useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from 'react-icons/fa6';

import toast, { Toaster } from "react-hot-toast";
const notify = () => toast.success("Successfully logged in");
const notify2 = () => toast.error("Email or password wrong");
export default function Page() {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const router = useRouter();

  async function handleSubmit(evt: any) {
    evt.preventDefault();
    const data = {
      email: emailRef?.current.value,
      password: passwordRef?.current.value,
    };

  
    try {
      let response = await axios.post(
        "https://library-backend.uz/api/auth/login",
        data
      );
      console.log(response , "resp");

      if (response.status == 201) {
        notify();
        if (typeof window !== "undefined") {
          localStorage.setItem("token", response?.data?.token);
        }
        router.push("/");
      } else {
        notify2();
      }
    } catch {
      notify2();
    }
  }

  return (
    <main className=" h-screen fixed z-50  w-[100%] m-auto pt-3   bg-gradient-to-br from-slate-900 to-teal-700 ">
      <div className="w-full flex justify-center items-center gap-0 md:gap-5">
       
        <div className="w-[95%] mx-auto md:w-[50%] mt-[120px] max-[500px]:mt-[100px] p-5 rounded-lg bg-[#f7fafc] dark:bg-[#171923] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex items-center justify-center gap-3 ">
        <button
					className='bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white font-bold py-1 px-4 rounded'
					onClick={() => router.push('/books')}
				>
					<FaArrowLeftLong size={15} className=' my_animate  ' />
					Back 
				</button>
        
          <h2 className="text-[2.25rem] text-black dark:text-white font-bold flex items-center">
            Kirish <span className="text-[#1a7745]">!</span>
          </h2>
        </div>
      
          <p className="text-black dark:text-white">
            Akauntingiz yo'qmi? {"  "}
            <Link
              href="/auth/register"
              className="underline cursor-pointer text-[#319795]"
            >
              Ro'yhatdan o'tish
            </Link>
          </p>
          <form className="pt-2" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col pb-3">
              <label
                htmlFor="email"
                className="text-[black] dark:text-white pb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email manzilingiz"
                className=" rounded-md bg-transparent p-4 color-white text-[black] dark:text-white  outline-ContactInputBorder outline outline-2 transition-all ease-in-out  focus:outline-newCourcesPreTitleColor focus:outline focus:outline-2"
                autoComplete="off"
                ref={emailRef}
              />
            </div>
            <div className="w-full flex flex-col pb-3">
              <label
                htmlFor="email"
                className="text-[black] dark:text-white pb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="email"
                placeholder="Parolingiz"
                className=" rounded-md bg-transparent p-4 color-white text-[black] dark:text-white  outline-ContactInputBorder outline outline-2 transition-all ease-in-out  focus:outline-newCourcesPreTitleColor focus:outline focus:outline-2"
                autoComplete="off"
                ref={passwordRef}
              />
            </div>
            <div className="flex gap-3 pb-5">
              <input type="checkbox" checked />
              <p className="text-[black] dark:text-white">Eslab qolish</p>
            </div>
            <button
              type="submit"
              className="w-[100%] py-4 font-medium bg text-[17px] bg-mainColor cursor-pointer border-none rounded-md transition ease-in-out hover:bg-ContactButtonHover"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

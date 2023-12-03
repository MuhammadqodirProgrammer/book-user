"use client";
import { useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
const notify = () => toast.success("Successfully logged in");
const notify2 = () => toast.error("Email or password wrong");

export default function Login() {
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
        "http://165.227.164.31:4040/api/StudentAuth/login",
        data
      );
      console.log(response);

      if (
        response.status == 200 &&
        response.data.result == true &&
        response.data.token
      ) {
        notify();
        const token = response.data.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }

        axios
          .get(`http://165.227.164.31:4040/api/identity`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res: any) => {
            const userName = (res?.data?.firstName).slice(0, 1).toUpperCase();
            if (typeof window !== "undefined") {
              localStorage.setItem("userName", userName);
            }
            if (res?.data?.identityRole == "Student") {
              router.push("/");
            }
          })
          .catch((err: any) => {
            // console.log(err);
          });
      } else {
        notify2();
      }
    } catch {
      notify2();
    }
  }

  return (
    <main className="max-w-[1010px] w-[100%] m-auto pt-3">
      <div className="w-full flex items-start gap-0 md:gap-5">
        <div className="w-0 md:w-[50%]">
          <svg
            viewBox="0 0 528 560"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            className="blur-3xl"
          >
            <circle cx="71" cy="61" r="111" fill="#F56565"></circle>
            <circle cx="244" cy="106" r="139" fill="#ED64A6"></circle>
            <circle cy="291" r="139" fill="#ED64A6"></circle>
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936"></circle>
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B"></circle>
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78"></circle>
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1"></circle>
          </svg>
        </div>
        <div className="w-full md:w-[50%] p-5 rounded-lg bg-[#f7fafc] dark:bg-[#171923] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <h2 className="text-[2.25rem] text-black dark:text-white font-bold">
            Kirish <span className="text-[#1a7745]">!</span>
          </h2>
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
              className="w-[100%] py-4 font-medium bg text-[17px] bg-ContactButton cursor-pointer border-none rounded-md transition ease-in-out hover:bg-ContactButtonHover"
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

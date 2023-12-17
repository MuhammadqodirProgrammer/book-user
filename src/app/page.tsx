"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lottie from "lottie-react";
import animatedData from "../../public/animations/Animation - 1702668030640.json";
import animatedData2 from "../../public/animations/Animation - 1702668102230.json";
import animatedData3 from "../../public/animations/Animation - 1702668905681.json";
import animatedData4 from "../../public/animations/Animation - 1702668968066.json";
import Image from "next/image";
import shelf from "../../public/images/shelf.png";
const { Swiper, SwiperSlide } = require("swiper/react");
const { Parallax, Autoplay } = require("swiper/modules");
import "swiper/css";
import book from "../../public/images/book.jpg";
import { Quote } from "lucide-react";
import { BookService } from "@/services/book.services";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel/HorizontalScrollCarousel";
import { baseURLImg } from "./api/api";
import TiltCard from "@/components/TiltCard/TiltCard";
import { AuthorService } from "@/services/author.services";
import Footer from "../layout/Footer/Footer";

export default function Home() {
  const [background, setBackground] = useState(20);

  const parallaxRef = useRef(null);
  const mountain3 = useRef(null);
  const mountain2 = useRef(null);
  const mountain1 = useRef(null);
  const cloudsBottom = useRef(null);
  const cloudsLeft = useRef(null);
  const cloudsRight = useRef(null);
  const stars = useRef(null);
  const sun = useRef(null);
  const copy = useRef(null);
  const scrollDown = useRef(null);
  const [mostviewbooks, setMostviewbooks] = useState<any>([]);
  const [mostcommentbooks, setMostcommentbooks] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);

  const fetchMostviewedbook = async () => {
    try {
      const data = await BookService.mostviewed();
      console.log(data);

      setMostviewbooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMostcommentedbook = async () => {
    try {
      const data = await BookService.mostcomment();
      setMostcommentbooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const data = await AuthorService.get();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMostviewedbook();
    fetchMostcommentedbook();
    fetchAuthors();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "5000 bottom",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            setBackground(Math.ceil(self.progress * 100 + 20));
          },
        },
      });
      tl.to(
        mountain3.current,
        {
          y: "-=80",
        },
        0
      );
      tl.to(
        mountain2.current,
        {
          y: "-=30",
        },
        0
      );
      tl.to(
        mountain1.current,
        {
          y: "+=50",
        },
        0
      );
      tl.to(
        stars.current,
        {
          top: 0,
        },
        0.5
      );
      tl.to(
        cloudsBottom.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        0
      );
      tl.to(
        cloudsLeft.current,
        {
          x: "-20%",
          opacity: 0,
        },
        0
      );
      tl.to(
        cloudsRight.current,
        {
          x: "20%",
          opacity: 0,
        },
        0
      );
      tl.to(
        sun.current,
        {
          y: "+=210",
        },
        0
      );
      tl.to(
        copy.current,
        {
          y: "-40%",
          opacity: 1,
        },
        0
      );
      tl.to(
        scrollDown.current,
        {
          opacity: 0,
        },
        0
      );
      // tl.to(
      //   btn.current,
      //   {
      //     opacity: 1,
      //   },
      //   1.5
      // );
    });
    return () => ctx.revert();
  }, []);

  // use effect for data

  return (
    <>
      {/* hero */}
      <div className="parallax-outer">
        <div
          ref={parallaxRef}
          style={{
            background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )`,
          }}
          className="parallax"
        >
          <img
            ref={mountain3}
            className="mountain-3"
            src="/parallax/mountain-3.svg"
          />
          <img
            ref={mountain2}
            className="mountain-2"
            src="/parallax/mountain-2.svg"
          />
          <img
            ref={mountain1}
            className="mountain-1"
            src="/parallax/mountain-1.svg"
          />
          <img ref={sun} className="sun" src="/parallax/sun.svg" />
          <img
            ref={cloudsBottom}
            className="clouds-bottom"
            src="/parallax/cloud-bottom.svg"
          />
          <img
            ref={cloudsLeft}
            className="clouds-left"
            src="/parallax/clouds-left.svg"
          />
          <img
            ref={cloudsRight}
            className="clouds-right"
            src="/parallax/clouds-right.svg"
          />
          <img ref={stars} className="stars" src="/parallax/stars.svg" />
          <div ref={copy} className="copy">
            <h1 className="hero_title">Bookinary</h1>
            <p className="flex gap-2">
              <Quote />
              <b className="text-center">
                It wasn't until I started reading and found books they wouldn't
                let us read in school that I discovered you could be insane and
                happy and have a good life without being like everybody else
              </b>
              <Quote />
            </p>
            <q className="relative flex pt-1">John Waters</q>
            <a
              href="/books"
              className={`
        px-6 py-3  rounded-full cursor-pointer
        flex items-center gap-2 text-white shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
         btn_hero font-semibold mt-6
    `}
            >
              Start Reading
            </a>
          </div>
          <div className="indicator" ref={scrollDown}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* about */}
      <h2 className="about_title" id="about">
        About
      </h2>
      <div className="about">
        <Lottie animationData={animatedData} />
        <div className="about_text">
          <h2>Deciding what to read next?</h2>
          <p>
            You’re in the right place. Tell us what titles or genres you’ve
            enjoyed in the past, and we’ll give you surprisingly insightful
            recommendations.Chances are your friends are discussing their
            favorite (and least favorite) books on <b>Bookinary</b>
          </p>
          <h2>Access to thousands of free ebooks</h2>
          <p>
            <b>Bookinary</b> is an online platfrom the provide an extensive
            library of books in digital format for free to every one around the
            world. with <b>Bookinary</b> you have access to all kind of
            educational, motivation and career book to keep you going in any
            areas.
          </p>
          <a
            href="/about"
            className={`
        px-6 py-3  rounded-full cursor-pointer
         gap-2 text-white shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
         btn_hero font-semibold inline-block mt-8
    `}
          >
            Read More
          </a>
        </div>
      </div>
      {/* books */}
      <h2 className="book_title">Books</h2>
      <div className="books_container">
        <div className="book_list">
          <h2>Most viewed books</h2>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            speed={600}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            parallax={true}
            pagination={{
              clickable: true,
            }}
            modules={[Parallax, Autoplay]}
            className="mySwiper"
          >
            {mostviewbooks?.map((book: any) => (
              <SwiperSlide>
                <a
                  href="/singlebook"
                  onClick={() => {
                    localStorage.setItem("book_id", book.id);
                  }}
                >
                  <Image
                    data-swiper-parallax="0"
                    className="book_image"
                    src={`${baseURLImg}/${book.book_image}`}
                    alt="image"
                    width={1000}
                    height={1000}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <Image
            className="shelf_img"
            src={shelf}
            alt="image"
            width={1000}
            height={1000}
          />
          <h2>Most commented books</h2>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            speed={600}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2600,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            parallax={true}
            pagination={{
              clickable: true,
            }}
            modules={[Parallax, Autoplay]}
            className="mySwiper"
          >
            {mostcommentbooks?.map((book: any) => (
              <SwiperSlide>
                <a
                  href="/singlebook"
                  onClick={() => {
                    localStorage.setItem("book_id", book.id);
                  }}
                >
                  <Image
                    data-swiper-parallax="0"
                    className="book_image"
                    src={`${baseURLImg}/${book.book_image}`}
                    alt="image"
                    width={1000}
                    height={1000}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <Image
            className="shelf_img"
            src={shelf}
            alt="image"
            width={1000}
            height={1000}
          />
        </div>
        <Lottie animationData={animatedData2} />
      </div>
      <HorizontalScrollCarousel />
      <a
        href="/books"
        className={`
        px-14 py-3  rounded-full cursor-pointer
         items-center gap-2 text-white shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
       font-semibold  flex justify-center max-w-[165px] m-auto relative top-[-80px]
    `}
      >
        See all
      </a>
      <h2 className="author_title">Authors</h2>
      <div className="flex text-slate-900 gap-5">
        {authors?.map((author: any) => (
          <TiltCard
            img={author.author_image}
            name={author.full_name}
            birthday={author.birthday}
            id={author.id}
          />
        ))}
      </div>
      <a
        href="/authors"
        className={`
        px-14 py-3  rounded-full cursor-pointer
         items-center gap-2 text-white shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
       font-semibold  flex justify-center max-w-[165px] m-auto mt-[80px]
    `}
      >
        See all
      </a>
      {/* contact */}
      <div className="py-2 px-4 mx-auto max-w-screen-md" id="contact">
        <h2
          className="mb-4 text-4xl font-extrabold  
                           text-center text-white"
        >
          Contact Us
        </h2>
        <p
          className="mb-4 font-light text-left  
                          text-gray-500 sm:text-xl"
        >
          Got a issue? Want to send feedback? Need details about our Courses?
          Let us know.
        </p>
        <form action="#">
          <div className="flex flex-row">
            <div className="w-1/2 pr-2 ">
              <label
                htmlFor="firstName"
                className="block my-2 text-left  
                                          text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                type="text"
                className="shadow-sm bg-gray-50 border 
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="firstName"
                className="block my-2 text-left text-sm  
                                          font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                className="shadow-sm bg-gray-50 border  
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block my-2 text-left text-sm  
                                      font-medium text-white"
            >
              Your email
            </label>
            <input
              type="email"
              className="shadow-sm bg-gray-50 border  
                                      border-gray-300 text-gray-900  
                                      text-sm rounded-lg block w-full p-2.5"
              placeholder="abc@geeksforgeeks.org"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block my-2 text-left  
                                      text-sm font-medium text-white"
            >
              Subject
            </label>
            <input
              type="text"
              className="block p-3 w-full text-sm  
                                      text-gray-900 bg-gray-50 rounded-lg  
                                      border border-gray-300 shadow-sm "
              placeholder="What issue/suggestion do you have?"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block my-2 text-left  
                                      text-sm font-medium text-white "
            >
              Your message
            </label>
            <textarea
              rows={6}
              className="block p-2.5 w-full text-sm  
                                         text-gray-900 bg-gray-50 rounded-lg  
                                         shadow-sm border border-gray-300 "
              placeholder="Query/Suggestion..."
            />
          </div>
          <button
            type="submit"
            className="mt-2 p-2 float-right text-white   
                                   rounded-lg border-green-600  
                                   bg-green-600 hover:scale-105"
          >
            Send message
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

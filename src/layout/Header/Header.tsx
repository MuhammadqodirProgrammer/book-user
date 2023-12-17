"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Button from "../../components/Button/Button";
import styled from "styled-components";
import { IoMdPersonAdd } from "react-icons/io";
import { Abril_Fatface } from "next/font/google";
import useHover3d from "../../utils/hover";
import { useAnimate, stagger } from "framer-motion";
import { MenuToggle } from "../../utils/MenuToggle";
import { Menu } from "../../utils/Header";
import { FaBlackTie } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { CgLogOut } from 'react-icons/cg';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FaBook } from 'react-icons/fa';

const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});
type Segment = [string, Record<string, string>, Record<string, any>];

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();
  
  useEffect(() => {
    const menuAnimations = isOpen
    ? [
          [
            "nav",
            { transform: "translateX(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 },
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
        ]
        : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }],
        ];

    // animate([
    //   [
    //     "path.top",
    //     { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
    //     { at: "<" },
    //   ],
    //   ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
    //   [
    //     "path.bottom",
    //     { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
    //     { at: "<" },
    //   ],
    //   ...menuAnimations.map((animation) => animation as Segment),
    // ]);
  }, [isOpen]);

  return scope;
}

function Header() {
  const pathname = usePathname();
	const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
const toggleOffcanvas = () => {
  setOffcanvasOpen(!isOffcanvasOpen);
};
console.log(isOffcanvasOpen , "isOffcanvasOpen");

  const hero = useRef<HTMLDivElement>(null);

  const hoverHero = useHover3d(hero, {
    x: 30,
    y: -40,
    z: 30,
  });

  const imageHover = useHover3d(hero, {
    x: 20,
    y: -5,
    z: 11,
  });

  return ( <>
    <HeaderStyled ref={hero}>
      <nav>
       
        <div className="logo">
          <Link href="/">
            <Image
              className="logo_img"
              src={logo}
              alt="logo"
              width={300}
              height={150}
            />
          </Link>
        </div>

        <ul className="nav-items">
          <li>
            <Link href="/" data-replace="Home">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="#about" data-replace="About">
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link href="/books" data-replace="Books">
              <span>Books</span>
            </Link>
          </li>
          <li>
            <Link href="/authors" data-replace="Authors">
              <span>Authors</span>
            </Link>
          </li>

          <li>
            <Link href="#contact" data-replace="Contact">
              <span>Contact</span>
            </Link>
          </li>
          <Link
            href="/auth/login"
            className={`
            test_cl
        px-6 py-3  rounded-full cursor-pointer
        flex items-center gap-2 text-white shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
         btn_hero font-semibold
    `}
          >
            <IoMdPersonAdd />
            Sign In
          </Link>
        </ul>

        <button
							type='button'
							className='mymenu header_icons_box  mr-3'
							onClick={toggleOffcanvas}
						>
							<svg
								stroke='currentColor'
								fill='currentColor'
								strokeWidth={0}
								viewBox='0 0 24 24'
								focusable='false'
								className='chakra-icon css-13otjrl'
								height='1em'
								width='1em'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g id='Menu_Fries'>
									<path d='M20.437,19.937c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002Z' />
									<path d='M20.437,11.5c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l10,-0.001Z' />
									<path d='M20.437,3.062c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001Z' />
								</g>
							</svg>
						</button>

        <Link
          href="/auth/login"
          className={`
        px-6 py-3  rounded-full cursor-pointer
        test_cl
        flex items-center gap-2 text-white shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
         btn_hero font-semibold mobileLoginBtn
    `}
        >
          <IoMdPersonAdd />
          Sign In
        </Link>
      </nav>
    </HeaderStyled>


    {isOffcanvasOpen && (
				<nav className={`${"bg-gradient-to-b from-slate-700 to-indigo-600"} navbar_offcanvas fixed top-0 left-0  h-screen  `}>
					<div className='h-[70px] flex items-center  px-3 justify-between'>
						<Image src={logo} alt='logo'  width={500}
          height={500} className=' h-[60px] w-[80%] ' />
						<button
							onClick={toggleOffcanvas}
							type='button'
							className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900   rounded-lg text-sm w-8 h-8  inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
						>
							<svg
								className='w-3 h-3'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 14 14'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
								/>
							</svg>
						</button>
					</div>
					<div className={`h-screen ${true ? "bg-[#fff] dark:bg-topColor":"bg-gradient-to-b from-slate-700 to-indigo-600"}`}>
						<div className='navbar_box text-black dark:text-mainColor '>
							<Link className='nav_link' href='/'>
								<button
									type='button'
									className={
										pathname == '/'
											? 'active_link nav_link-button'
											: 'nav_link-button'
									}
									onClick={toggleOffcanvas}
								>
									<div className='flex items-center gap-x-2 justify-start'>
										<svg
											stroke='currentColor'
											fill='currentColor'
											strokeWidth={0}
											viewBox='0 0 1024 1024'
											focusable='false'
											className='nav_link_icon'
											height='1em'
											width='1em'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M924.8 385.6a446.7 446.7 0 0 0-96-142.4 446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96 446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 0 1 140 560c0-99.4 38.7-192.8 109-263 70.3-70.3 163.7-109 263-109 99.4 0 192.8 38.7 263 109 70.3 70.3 109 163.7 109 263 0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 0 0-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 0 0 0 79.2 55.95 55.95 0 0 0 79.2 0 55.87 55.87 0 0 0 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 0 0-11.3 0l-56.6 56.6a8.03 8.03 0 0 0 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 0 0-11.3 0l-31.1 31.1a8.03 8.03 0 0 0 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z' />
										</svg>
										<p className='css-0'>Home</p>
									</div>
								</button>
							</Link>
				
							<Link className='nav_link' href='/authors'>
								<button
									type='button'
									className={
										pathname == '/authors'
											? 'active_link nav_link-button'
											: 'nav_link-button'
									}
									onClick={toggleOffcanvas}
								>
									<div className='flex items-center gap-x-2 justify-start'>
										
										<FaBlackTie size={20} />
										<p className='chakra-text css-0'>authors</p>
									</div>
								</button>
							</Link>
							
							
							<Link className='nav_link' href='/books'>
								<button
									type='button'
									className={
										pathname == '/books'
											? 'active_link nav_link-button'
											: 'nav_link-button'
									}
									onClick={toggleOffcanvas}
								>
									<div className='flex items-center gap-x-2 justify-start'>
										<FaBook size={20} />
										<p className='chakra-text css-0'>Books</p>
									</div>
								</button>
							</Link>

						
							<div className='nav_link'>
								<button
									type='button'
									className={
										pathname == '/requirement'
											? 'active_link nav_link-button'
											: 'nav_link-button'
									}
									onClick={() => {
										router.push('/login');
										localStorage.removeItem('token');
										toggleOffcanvas();
									}}
								>
									<div className='flex items-center gap-x-2 justify-start'>
										<CgLogOut />
										<p className='chakra-text css-0'>LogOut</p>
									</div>
								</button>
							</div>
						</div>
					</div>
				</nav>
			)}
    </>
  );
}

const HeaderStyled = styled.header`
  nav {
    padding: 0 4rem;
    min-height: 10vh;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    z-index: 2;
    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
    }

    .logo_img {
      height: 100px !important;
      object-fit: cover;
      mix-blend-mode: hard-light;
    }

    .input {
      flex: 2;
      display: flex;
      justify-content: center;
      input {
        width: 55%;
        padding: 0.6rem 0.8rem;
        border-radius: 8px;
        background-color: #161616;
        border: 1px solid var(--color-border);
        &::placeholder {
          color: var(--color-border);
          font-weight: 500;
        }
      }
    }

    .nav-items {
      display: flex;
      align-items: center;
      gap: 2rem;
      li {
        transition: all 0.2s ease-in-out;
        font-family: "Mulish", sans-serif;
        font-weight: 700;

        &:hover {
          color: white;
          transform: scale(1.1);
        }
        a {
          overflow: hidden;
          position: relative;
          display: inline-block;
        }
        a::before,
        a::after {
          content: "";
          position: absolute;
          width: 100%;
          left: 0;
        }
        a::before {
          background-color: #54b3d6;
          height: 2px;
          bottom: 0;
          transform-origin: 100% 50%;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
        }
        a::after {
          content: attr(data-replace);
          height: 100%;
          top: 0;
          transform-origin: 100% 50%;
          transform: translate3d(200%, 0, 0);
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
          color: #54b3d6;
        }

        a:hover::before {
          transform-origin: 0% 50%;
          transform: scaleX(1);
        }
        a:hover::after {
          transform: translate3d(0, 0, 0);
        }

        a span {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
        }

        a:hover span {
          transform: translate3d(-200%, 0, 0);
        }
      }
      @media (max-width: 1000px) {
        display: none !important;
      }
    }
    @media (max-width: 1100px) {
      padding: 0 2rem !important;
    }
    @media (max-width: 700px) {
      padding: 0 1rem !important;
    }
    @media (max-width: 500px) {
      padding: 0 !important;
    }

    .mobileToggleMenu {
      display: none !important;
      @media (max-width: 1000px) {
        display: block !important;
      }
    }
  }

  .header-content {
    padding: 0 10rem 5rem 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
    min-height: calc(100vh - 10vh);
    margin-top: 30px;

    .text-content {
      > h1 {
        font-size: clamp(2rem, 5vw, 5rem);
        color: #f2994a;
        transition: all 0.01s linear;
        padding-bottom: 1.5rem;
      }

      .buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2.5rem;
      }
    }

    .image-content .image {
      border-radius: 8px;
      background-color: var(--color-bg);
      border: 1px solid var(--color-border);

      img {
        border-radius: 8px;
      }
    }
  }
  .mobileLoginBtn {
    display: none !important;
    @media (min-width: 1000px) {
      display: none !important;
    }
    @media (max-width: 1000px) {
      display: none !important;
    }
  }
`;

export default Header;

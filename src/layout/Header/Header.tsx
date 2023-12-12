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

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
      ...menuAnimations.map((animation) => animation as Segment),
    ]);
  }, [isOpen]);

  return scope;
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

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

  return (
    <HeaderStyled ref={hero}>
      <nav>
        <div ref={scope} className="mobileToggleMenu">
          <Menu />
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </div>
        <div className="logo">
          <a href="/">
            <Image
              className="logo_img"
              src={logo}
              alt="logo"
              width={300}
              height={150}
            />
          </a>
        </div>

        <ul className="nav-items">
          <li>
            <a href="#" data-replace="Home">
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" data-replace="About">
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="#" data-replace="Books">
              <span>Books</span>
            </a>
          </li>
          <li>
            <a href="#" data-replace="Authors">
              <span>Authors</span>
            </a>
          </li>
          <li>
            <a href="#" data-replace="Contact">
              <span>Contact</span>
            </a>
          </li>
          <Button name="Login" icon={<IoMdPersonAdd />} />
        </ul>
        <Button
          className="mobileLoginBtn"
          name="Login"
          icon={<IoMdPersonAdd />}
        />
      </nav>

      {/* <div className="header-content">
        <div className="image-content">
          <div
            className="image"
            style={{
              transform: hoverHero.transform,
            }}
          >
            <Image
              src="/images/monkey.png"
              width={500}
              height={500}
              alt="hero"
              style={{
                transform: imageHover.transform,
              }}
            />
          </div>
        </div>

        <div className="image-content">
          <div
            className="image"
            style={{
              transform: hoverHero.transform,
            }}
          >
            <Image
              src="/images/monkey.png"
              width={500}
              height={500}
              alt="hero"
              style={{
                transform: imageHover.transform,
              }}
            />
          </div>
        </div>
      </div> */}
    </HeaderStyled>
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
    @media (max-width: 1000px) {
      padding: 0 2rem !important;
    }
    @media (max-width: 700px) {
      padding: 0 1rem !important;
    }
    @media (max-width: 500px) {
      padding: 0 !important;
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
      display: flex !important;
    }
  }
`;

export default Header;

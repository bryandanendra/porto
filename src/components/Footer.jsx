import React from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import BlurText from "../blocks/TextAnimations/BlurText/BlurText";
export const Footer = () => {
  return (
    <footer className="py-8" id="contact">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between flex-col md:flex-row">
          <div>
            <h2 className="md:text-7xl text-4xl font-bold mb-5 text-white/50">
              <BlurText text="Get in touch" className="text-gray-400"/>
            </h2>
            <a
              className="md:text-7xl text-4xl font-semibold text-white underline decoration-gray-400 decoration-2
                                    underline-offset-4 hover:decoration-gray-200 transition duration-300"
              href="mailto:john@doe.com"
            >
              brian4icm@gmail.com
            </a>
          </div>

          <div className="text-white/50 mt-12">
            <div className="text-lg mb-8">
              <p className="font-bold">Office</p>
              <p>Surabaya</p>
              <p>East Java</p>
              <p>Indonesia</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center mt-8 py-12">
          <h1 className="hidden md:block text-[10rem] md:text-[12rem] lg:text-[15rem] font-bold text-white opacity-10">
            BRIAN
          </h1>

          <h1 className="md:hidden relative text-9xl md:text-[12rem] lg:text-[15rem] font-bold text-white opacity-10">
            BRIAN
          </h1>
        </div>

        <div className="relative mt-12 container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
          <p className="text-gray-200 caption text-n-4 lg:block">
            © 2024. All rights reserved.
          </p>

          <ul className="flex gap-5 flex-wrap">
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="text-gray-200 flex items-center justify-center w-10 h-10 rounded-full"
            >
              <AiFillGithub size={30} />
            </a>
            <a
              href="https://x.com"
              aria-label="X (Twitter)"
              className="text-gray-200 flex items-center justify-center w-10 h-10 rounded-full"
            >
              <AiOutlineTwitter size={30} />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-gray-200 flex items-center justify-center w-10 h-10 rounded-full"
            >
              <AiFillFacebook size={30} />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-gray-200 flex items-center justify-center w-10 h-10 rounded-full"
            >
              <AiFillInstagram size={30} />
            </a>
            <a
              href="https://telegram.org"
              aria-label="Telegram"
              className="text-gray-200 flex items-center justify-center w-10 h-10 rounded-full"
            >
              <FaTelegramPlane size={30} />
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
};

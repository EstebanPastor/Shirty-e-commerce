"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { mainLinks } from "@/constants";
import { userLinks } from "@/constants";

import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { TbBracketsAngle } from "react-icons/tb";

import { User } from "@prisma/client";

interface NavBarProps {
  user: User;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const userMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };

  return (
    <nav>
      <div className="main-container border-b border-1 flex justify-between items-center py-2 relative">
        <Link href={"/"}>
          <div className="flex gap-1 items-center text-xl font-medium text-black">
            <h1>NEW WAVE</h1>
            <TbBracketsAngle />
          </div>
        </Link>
        <ul className="flex gap-10 max-md:hidden">
          {mainLinks.map((link) => (
            <Link href={link.route} key={link.label}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>
        <div className="flex gap-5 text-xl [&>*]:cursor-pointer">
          <AiOutlineShoppingCart />
          <AiOutlineHeart />
          <div className="max-md:hidden" onClick={userMenuHandler}>
            <AiOutlineUser />
          </div>
          <div className="md:hidden" onClick={mobileMenuHandler}>
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>
        </div>
        {openUserMenu && (
          <div className="z-10 absolute right-0 top-[40px] w-28 bg-gray-700 shadow-md rounded-md p-4 text-white max-md:hidden text-center">
            {!user ? (
              <ul>
                <li>
                  <Link href={"/sign-in"}>Log In</Link>
                </li>
                <li>
                  <Link href={"/sign-up"}>Sign Up</Link>
                </li>
              </ul>
            ) : (
              <ul>
                {userLinks.map((link, id) => (
                  <Link href={link.route} key={id}>
                    <li>{link.label}</li>
                  </Link>
                ))}
                <li className="cursor-pointer" onClick={() => signOut()}>
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      {openMobileMenu && (
        <div className="md:hidden">
          <div className="absolute right-5 w-48 bg-gray-700 py-5 shadow-md rounded-md p-4 text-white text-center z-[99999]">
            <ul className="flex flex-col gap-5">
              {mainLinks.map((link) => (
                <Link href={link.route} key={link.label}>
                  <li>{link.label}</li>
                </Link>
              ))}
              {!user ? (
                <>
                  <li>
                    <Link href={"/sign-in"}>Log In</Link>
                  </li>
                  <li>
                    <Link href={"/sign-up"}>Sign Up</Link>
                  </li>
                </>
              ) : (
                <>
                  {userLinks.map((link, id) => (
                    <Link href={link.route} key={id}>
                      <li>{link.label}</li>
                    </Link>
                  ))}
                  <li className="cursor-pointer" onClick={() => signOut()}>
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

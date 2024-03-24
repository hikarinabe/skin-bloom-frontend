import Link from "next/link";

import Image from "next/image";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "./Header.module.scss";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const handleMenuOpen = () => {
    setOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <header className="py-6 px-4 flex justify-between items-center">
      <Link href="/home/mypage" className={styles.noLinkStyle}>
        <h1 className={styles.logo}>SkinBloom</h1>
      </Link>

      <nav
        className={
          isOpen
            ? "z-40 bg-blue-100 fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col"
            : "fixed right-[-100%] md:right-4"
        }
      >
        <ul
          className={
            isOpen
              ? "flex h-screen justify-center items-center flex-col gap-6 text-xl"
              : "block md:flex md:gap-8"
          }
        >
          <li key="Home" className={styles.navItem}>
            <Link onClick={handleMenuClose} href="/home/mypage">
              Home
            </Link>
          </li>
          <li onClick={handleMenuClose} key="Search" className={styles.navItem}>
            <Link href="/cosmetics/search">Search</Link>
          </li>
          <li
            onClick={handleMenuClose}
            key="Records"
            className={styles.navItem}
          >
            <Link href="/logs">Records</Link>
          </li>
          <Link
            onClick={handleMenuClose}
            href="/setting/profile"
            className={styles.iconWrapper}
          >
            <Image
              className={styles.icon}
              alt=""
              src="/icons/person.svg"
              width={40}
              height={40}
            />
          </Link>
          <div onClick={handleMenuClose} className={styles.logoutButtonWrapper}>
            <LogoutButton />
          </div>
        </ul>
      </nav>
      <button className="z-50 space-y-2 md:hidden" onClick={handleMenuOpen}>
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen
              ? "block opacity-0 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 -rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
      </button>
    </header>
  );
}

import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import img from "../../img/logo.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { signOut } from "next-auth/react";

const Nav = () => {
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const isBrowser = () => typeof window !== "undefined";

  const changeBackground = () => {
    // console.log(scrollY);
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  if (isBrowser()) {
    window.addEventListener("scroll", changeBackground);
  }

  return (
    <header
      className={` ${navbar ? `${styles.nav_container} ${styles.nav_active}` : styles.nav_container} ${
        isOpen ? styles.nav_container_mobile : ""
      } `}
    >
      <div className={styles.nav_box}>
        <Link href="/mainpage" className={styles.nav_img_con}>
          <Image src={img} alt="Chilling" className={styles.nav_img} height={95} />
        </Link>

        <div className={styles.Hamburger_container}>
          <Hamburger size={35} toggled={isOpen} toggle={setOpen} />
        </div>

        {/* PC Version */}
        <div className={styles.nav_link_holder}>
          <Link href={"/mainpage"}>Main Page</Link>
          <a target="_blank" href="https://www.hydrationationiv.com/">
            Main Web Site
          </a>
          <Link href={"/customers"}>Customers </Link>
          <Link href={"/productspage"}>Products </Link>
          <Link href={"/lockpage"}>Lock Dates</Link>
          <Link href={"/"} onClick={() => signOut()} className="yellow">
            Sign Out
          </Link>
          <div className={styles.socials_container}>
            <a href="https://www.facebook.com/HydratioNationIV/" target="_blank">
              <div className={`${styles.icon} ${styles.facebook}`}>
                <div className={styles.tooltip}>Facebook</div>
                <span>
                  <FaFacebookF />
                </span>
              </div>
            </a>
            <a href="https://www.instagram.com/hydrationationiv/" target="_blank">
              <div className={`${styles.icon} ${styles.instagram}`}>
                <div className={styles.tooltip}>Instagram</div>
                <span>
                  <FaInstagram />
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile */}

        <div
          className={`
          ${isOpen ? `${styles.nav_link_mobile} ${styles.nav_link_mobile_active}` : styles.nav_link_mobile} ${
            styles.nav_link_holder
          } `}
        >
          <Link href={"/mainpage"}>Main Page</Link>
          <a target="_blank" href="https://www.hydrationationiv.com/" onClick={() => setOpen(!isOpen)}>
            Main Web Site
          </a>
          <Link href={"/customers"} onClick={() => setOpen(!isOpen)}>
            Customers{" "}
          </Link>
          <Link href={"/productspage"} onClick={() => setOpen(!isOpen)}>
            Products{" "}
          </Link>
          <Link href={"/lockpage"} onClick={() => setOpen(!isOpen)}>
            Lock Dates
          </Link>
          <Link href={"/"} onClick={() => signOut()} className="yellow">
            Sign Out
          </Link>
          <div className={styles.socials_container}>
            <a href="https://www.facebook.com/HydratioNationIV/" target="_blank">
              <div className={`${styles.icon} ${styles.facebook}`}>
                <div className={styles.tooltip}>Facebook</div>
                <span>
                  <FaFacebookF />
                </span>
              </div>
            </a>
            <a href="https://www.instagram.com/hydrationationiv/" target="_blank">
              <div className={`${styles.icon} ${styles.instagram}`}>
                <div className={styles.tooltip}>Instagram</div>
                <span>
                  <FaInstagram />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;

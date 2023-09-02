import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import img1 from "../img/aboutus.png";
import { useRouter } from "next/router";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({
    name_error: "",
    password_error: "",
    not_found: "",
  });

  const [data, setData] = useState({
    login: "",
    password: "",
  });

  // handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  // submit form
  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      login: data.login,
      password: data.password,
      callbackUrl: "/mainpage",
    });
    if (res?.ok) router.push("/mainpage");
  };

  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.img_holder}>
          <Image src={img1} alt="chilling" />
        </div>
        <div className={styles.form_holder}>
          <div>
            <h1>Admin Panel</h1>
            <h3>Login Page</h3>
          </div>
          <form onSubmit={(e) => handleClick(e)} className={styles.form}>
            <span className="error">{errors.not_found}</span>
            <div className={styles.input_holder}>
              <label htmlFor="login">Name:</label>
              <span className="error">{errors.name_error}</span>
              <input type="text" id="login" name="login" value={data.login} onChange={(e) => handleChange(e)} />
            </div>
            <div className={styles.input_holder}>
              <label htmlFor="password">Password:</label>
              <span className="error">{errors.password_error}</span>
              <div>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={(e) => handleChange(e)}
                />
                <button className={styles.showPass} type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <BsFillEyeSlashFill size={25} /> : <BsFillEyeFill size={25} />}
                </button>
              </div>
            </div>
            <button type="submit" className="yellow">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

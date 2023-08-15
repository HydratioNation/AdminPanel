import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import checkSession from "@/components/SessionCheck";
import TopCards from "@/components/TopCards";
// import BarChart from "@/components/ChartBar";
import { getNumberCustomersNSales, updatePasswordFunction } from "@/lib/api";
import { useSession } from "next-auth/react";

interface NOC {
  sales: number;
  customers: number;
}
interface ChangePass {
  newpassword: string;
  confirm: string;
  id: string | null | undefined;
}

const MainPage = () => {
  const result = checkSession();
  const { data: session, status } = useSession();

  const id = session?.user?.email;
  const [numberOfCustomers, setNumberOfCustomers] = useState<NOC[]>();
  const [password, setPassword] = useState<ChangePass>({
    newpassword: "",
    confirm: "",
    id: id,
  });
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const getList = async () => {
      try {
        await getNumberCustomersNSales()
          .then((res) => res.json())
          .then((json) => {
            setNumberOfCustomers(json);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getList();
    setPassword({
      ...password,
      id: id,
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (id) {
      if (password.confirm !== password.newpassword) {
        return setError("passwords does not match");
      }

      if (password.confirm.length < 8 || password.newpassword.length < 8) {
        return setError("At least 8 characters");
      }

      try {
        await updatePasswordFunction(password)
          .then((res) => res.json())
          .then((json) => {
            setResponse(json.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      return setError("problem with auth");
    }
  };

  return (
    <div className={styles.container}>
      {result === "authenticated" ? (
        <div className={styles.module}>
          {numberOfCustomers ? <TopCards data={numberOfCustomers} /> : ""}
          <div>
            <h1>Graphs</h1>
            {/* <BarChart /> */}
          </div>
          <div className="topping flex-col">
            <h1>Change Password</h1>
            <h3 className="success">{response}</h3>
            <h3 className="error">{error}</h3>
          </div>
          <form onSubmit={handleUpdate} className="flex flex-col gap-y-7">
            <div className="topping flex-col">
              <label htmlFor="">New password:</label>
              <input
                type="text"
                placeholder="New Password"
                value={password.newpassword}
                name="newpassword"
                onChange={handleChange}
              />
            </div>
            <div className="topping flex-col">
              <label htmlFor="">Confirm password:</label>
              <input
                value={password?.confirm}
                placeholder="Confirm password"
                onChange={handleChange}
                name="confirm"
                type="text"
              />
            </div>
            <div className="topping">
              <button className="yellow  ">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainPage;

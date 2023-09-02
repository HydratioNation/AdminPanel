import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { getCustomersList } from "@/lib/api";
import Image from "next/image";
import Card from "@/components/Card";
import load from "../../img/Spin.svg";

interface CustomersList {
  id: number;
  name: string;
  number: string;
  email: string;
  date: string;
  time: string;
  product: string;
  location: string;
  price: number;
}

const Services = () => {
  const [custromers, setCustomers] = useState<CustomersList[]>();
  const [thisMonth, setThisMonth] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getList1 = async () => {
      try {
        await getCustomersList()
          .then((res) => res.json())
          .then((json) => {
            setCustomers(json);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getList1();
  }, []);

  const filterList = () => {
    let today = new Date();
    let thisMonthName = today.toLocaleString("en-US", {
      month: "long",
    });
    let thisYear = today.toLocaleString("en-US", {
      year: "numeric",
    });
    let date = thisYear + "-" + thisMonthName.toLocaleLowerCase();
    if (thisMonth) {
      console.log("here", date);
      return custromers?.filter((e) => {
        if (e.date.toLowerCase().includes(date.toLocaleLowerCase())) return e;
      });
    }

    return custromers?.filter((e) => {
      if (
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.product.toLowerCase().includes(search.toLowerCase()) ||
        e.id.toString().includes(search.toLowerCase()) ||
        e.date.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.number.toLowerCase().includes(search.toLowerCase())
      )
        return e;
    });
  };

  return (
    <div className={`services_container spacer`}>
      <div className={`card_list`}>
        <div className={`topping`}>
          <h1>Customers</h1>
          <button
            className={`yellow ${styles.button_yel}`}
            onClick={() => {
              setThisMonth(!thisMonth);
              filterList;
            }}
          >
            {thisMonth ? "All customers" : "For this month"}
          </button>
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {custromers ? (
          filterList()?.map((e) => {
            return <Card key={`${e.id}`} data={e} />;
          })
        ) : (
          <div className="center">
            <Image src={load} alt="loading..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;

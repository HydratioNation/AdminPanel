import React, { FC } from "react";
import styles from "./index.module.css";
import { FaShoppingBag } from "react-icons/fa";

interface IProps {
  data: {
    id: number;
    name: string;
    number: string;
    email: string;
    date: string;
    time: string;
    product: string;
    location: string;
    price: number;
  };
}

const Card: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_info}>
        <div>
          <p className="text-gray-800 font-bold">Name: {data.name}</p>
          <p className="text-gray-800 font-bold">Order ID: {data.id}</p>
        </div>
        <FaShoppingBag className={styles.img_BUY} />
      </div>
      <div className={styles.card_info}>
        <p className="text-gray-800 font-bold">{data.product}</p>
        <p className="text-gray-800 font-bold">${data.price}</p>
      </div>
      <div className={styles.card_info}>
        <p className="text-gray-800 font-bold">
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </p>
        <p className="text-gray-800 font-bold">
          <a href={`tel:${data.number}`}>{data.number}</a>
        </p>
      </div>
      <div className={styles.card_info}>
        <p className="text-gray-800 font-bold">
          {data.date} {data.time}
        </p>
        <p className="text-gray-800 font-bold">{data.location}</p>
      </div>
    </div>
  );
};

export default Card;

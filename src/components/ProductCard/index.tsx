import React, { FC, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import icon1 from "../../img/IVTherapyHydrationServices.svg";
import icon2 from "../../img/InjectionTherapyHydrationServices.svg";
import { VscEdit } from "react-icons/vsc";
import { AiOutlineSave, AiFillDelete } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { createNewProductFunction, deleteProductFunction, updateProductFunction } from "@/lib/api";
import { json } from "stream/consumers";

interface IProps {
  data: {
    id: number;
    icon: boolean;
    name: string;
    price: number;
    description: string;
    productType: string;
  };
  newCard: boolean;
  setCreateCard: (e: React.SetStateAction<boolean>) => void;
  setDeleted: (e: React.SetStateAction<boolean>) => void;
  deleted: boolean;
}

interface UpdatedData {
  id: number;
  icon: boolean;
  name: string;
  price: number;
  description: string;
  productType: string;
}

const ProductCard: FC<IProps> = ({ data, newCard, setCreateCard, setDeleted, deleted }) => {
  const [edit, setEdit] = useState(newCard ? true : false);
  const [newData, setNewData] = useState<UpdatedData>(data);
  const [response, setResponse] = useState("");
  const [active, setActive] = useState(true);
  const [errors, setErros] = useState({
    er_name: "",
    er_price: "",
    er_description: "",
  });

  // handle form changes
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const res = () => {
      if (value === "Recovery Hydration Pack") return false;
      else return true;
    };
    if (e.target.name === "productType") {
      setNewData({
        ...newData,
        [e.target.name]: value,
        icon: res(),
      });
      console.log(data);
    } else {
      setNewData({
        ...newData,
        [e.target.name]: value,
      });
    }
  };

  // handleEdit click

  const handleEdit = () => {
    setEdit(!edit);
  };

  // Cancel edition
  const cancelEdit = () => {
    setEdit(!edit);
    setNewData(data);
  };

  // handle update Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var regExp = /[a-zA-Z]/g;
    var testString = "john";
    setActive(!active);
    setErros({
      er_name: "",
      er_price: "",
      er_description: "",
    });

    if (!newData.name || newData.name.length < 1) {
      setActive(true);
      return setErros({ ...errors, er_name: "Can't be empty" });
    }

    if (!newData.price || newData.price.toString().length < 1) {
      setActive(true);
      return setErros({ ...errors, er_price: "Can't be empty" });
    } else if (regExp.test(newData.price.toString())) {
      setActive(true);
      return setErros({ ...errors, er_price: "Can't contain letters" });
    }
    if (!newData.description || newData.description.length < 1) {
      setActive(true);
      return setErros({ ...errors, er_description: "Can't be empty" });
    }

    if (data === newData) {
      setResponse("Data is the same");
      setTimeout(function () {
        setResponse("");
      }, 6000);
      return setActive(true);
    }
    try {
      await updateProductFunction(newData)
        .then((res) => res.json())
        .then((json) => {
          setResponse(json.message);
        });
    } catch (error) {
      console.log(error);
    }

    setEdit(!edit);
    setTimeout(function () {
      setResponse("");
    }, 6000);
    setActive(true);
  };

  //create new card
  const createNewCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var regExp = /[a-zA-Z]/g;
    var testString = "john";
    setActive(!active);
    setErros({
      er_name: "",
      er_price: "",
      er_description: "",
    });

    if (!newData.name || newData.name.length < 1) {
      setActive(true);
      return setErros({ ...errors, er_name: "Can't be empty" });
    }

    if (!newData.price || newData.price.toString().length < 1) {
      setActive(true);
      return setErros({ ...errors, er_price: "Can't be empty" });
    } else if (regExp.test(newData.price.toString())) {
      setActive(true);
      return setErros({ ...errors, er_price: "Can't contain letters" });
    }
    if (!newData.description || newData.description.length < 1) {
      setActive(true);
      return setErros({ ...errors, er_description: "Can't be empty" });
    }

    if (data === newData) {
      setResponse("Data is the same");
      setTimeout(function () {
        setResponse("");
      }, 6000);
      return setActive(true);
    }
    try {
      await createNewProductFunction(newData)
        .then((res) => res.json())
        .then((json) => {
          setResponse(json.message);
        });
    } catch (error) {
      console.log(error);
    }

    setEdit(!edit);
    setTimeout(function () {
      setResponse("");
    }, 6000);
    setCreateCard(false);
    setActive(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProductFunction(id)
      .then((res) => {
        res.json();
      })
      .then((json) => {});
    setEdit(false);
    setDeleted(!deleted);
  };

  return (
    <form
      onSubmit={(e) => {
        !newCard ? handleSubmit(e) : createNewCard(e);
      }}
      className={styles.productcard_container}
    >
      <div className="flex items-start ">
        <div className={`${styles.inputs_cont} ${styles.child}`}>
          <label htmlFor="input">Product Name:</label>
          <label htmlFor="er" className="error">
            {errors.er_name}
          </label>
          <input
            className={`${styles.inputs} ${edit ? styles.border : ""} `}
            type="text"
            placeholder="product name"
            value={newData.name}
            name="name"
            onChange={handleChange}
            readOnly={!edit}
          />
        </div>
        <Image src={newData.icon ? icon1 : icon2} alt="img" height={70} />
      </div>
      <div className={`${styles.inputs_cont} ${styles.child1}`}>
        <label htmlFor="input">Price:</label>
        <label htmlFor="er" className="error">
          {errors.er_price}
        </label>
        <div className={`flex align-center f-12 ${styles.price} `}>
          $
          <input
            className={`${styles.inputs} ${edit ? styles.border : ""} `}
            type="number"
            placeholder="price"
            value={newData.price}
            name="price"
            onChange={(e) => {
              setNewData({ ...newData, price: parseInt(e.target.value) });
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            readOnly={!edit}
          />
        </div>
      </div>
      <div className={`${styles.inputs_cont} ${styles.child2}`}>
        <label htmlFor="input">Description:</label>
        <label htmlFor="er" className="error">
          {errors.er_description}
        </label>
        <textarea
          className={`${styles.inputs} ${edit ? styles.border : ""} ${styles.min_area} `}
          name="description"
          cols={30}
          rows={3}
          value={newData.description}
          onChange={(e) => {
            handleChange(e);
          }}
          readOnly={!edit}
        ></textarea>
      </div>
      <div className={`${styles.inputs_cont} ${styles.child3}`}>
        <label htmlFor="input">Product Type:</label>
        <select
          className={`${styles.inputs} ${edit ? styles.border : "pointer-events-none"} `}
          name="productType"
          onChange={(e) => {
            handleChange(e);
          }}
          value={newData.productType}
        >
          <option value="Wellness Hydration Pack">Wellness Hydration Pack</option>
          <option value="Recovery Hydration Pack">Recovery Hydration Pack</option>
        </select>
      </div>
      <div className={`flex flex-col items-center ${styles.buttons} ${styles.child4} `}>
        <h1 className={response === "Product updated" ? "success" : "error"}>{response}</h1>
        {!newCard ? (
          !edit ? (
            <button type="button" onClick={handleEdit}>
              <VscEdit size={60} color={"var(--aqua)"} />
            </button>
          ) : (
            <div className="flex gap-10">
              {/* <button>Save</button> */}
              <button type="submit" className={active ? "" : "disabled"} disabled={!active}>
                <AiOutlineSave size={60} color={"var(--aqua)"} />
              </button>
              <button type="button" onClick={cancelEdit} className={active ? "" : "disabled"} disabled={!active}>
                <FcCancel size={60} color={"red"} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(newData.id)}
                className={active ? "" : "disabled"}
                disabled={!active}
              >
                <AiFillDelete size={60} color={"red"} />
              </button>
            </div>
          )
        ) : (
          <button type="submit" className={active ? "" : "disabled"} disabled={!active}>
            <AiOutlineSave size={60} color={"var(--aqua)"} />
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductCard;

import React, { useState, useEffect } from "react";
import { getProductsList } from "@/lib/api";
import Image from "next/image";
import load from "../../img/Spin.svg";
import ProductCard from "@/components/ProductCard";
import { AiOutlinePlus } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import styles from "./index.module.css";

interface ProductList {
  id: number;
  icon: boolean;
  name: string;
  price: number;
  description: string;
  productType: string;
}

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductList[]>();
  const [createCard, setCreateCard] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductList>({
    id: 0,
    icon: false,
    name: "",
    price: 0,
    description: "",
    productType: "Recovery Hydration Pack",
  });
  useEffect(() => {
    const getList = async () => {
      try {
        await getProductsList()
          .then((res) => res.json())
          .then((json) => {
            setProducts(json);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [createCard, deleted]);

  const filterList = () => {
    return products?.filter((e) => {
      if (
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.price.toString().toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.productType.toLowerCase().includes(search.toLowerCase())
      )
        return e;
    });
  };

  return (
    <div className={`services_container spacer`}>
      <div className={`card_list`}>
        <div className={`topping`}>
          <h1>Customers</h1>
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <button className={styles.create_button} onClick={() => setCreateCard(!createCard)}>
          {createCard ? <FcCancel size={50} /> : <AiOutlinePlus size={50} />}
        </button>

        {createCard ? (
          <ProductCard
            key={0}
            data={newProduct}
            newCard={true}
            setCreateCard={setCreateCard}
            setDeleted={setDeleted}
            deleted={deleted}
          />
        ) : (
          ""
        )}
        {products ? (
          filterList()?.map((e) => {
            return (
              <ProductCard
                key={`${e.id}`}
                data={e}
                newCard={false}
                setCreateCard={setCreateCard}
                setDeleted={setDeleted}
                deleted={deleted}
              />
            );
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

export default ProductsPage;

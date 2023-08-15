import React, { useState, useEffect } from "react";
import { getProductsList } from "@/lib/api";
import Image from "next/image";
import load from "../../img/Spin.svg";
import ProductCard from "@/components/ProductCard";

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
  }, []);

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
        {products ? (
          filterList()?.map((e) => {
            return <ProductCard key={`${e.id}`} data={e} />;
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

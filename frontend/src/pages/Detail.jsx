import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Item from "../components/Item";
import { useCart } from "../contexts/CartContext";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { addToCart } = useCart();
  const { itemId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const url = `http://localhost:3000/items/${itemId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          setErrorMessage(errorMessage);
          throw new Error(errorMessage);
        }
        setData(await response.json());
      } catch (error) {
        console.error("Error fetching item details:", error);
        setErrorMessage(error.message);
        return <p>Error loading item details.</p>;
      }
    }

    fetchItemDetails();
  }, [itemId]);
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      {console.log(data.cover)}
      <Item
        key={data.id}
        name={data.name}
        price={data.price}
        imageUrl={data.cover}
        description={
          data.description || "Premium sports equipment for athletes."
        }
        onSale={data.onSale}
        salesPrice={data.salesPrice}
        onAddToCart={() => addToCart(data)}
      />
      <Footer />
    </div>
  );
};

export default Detail;

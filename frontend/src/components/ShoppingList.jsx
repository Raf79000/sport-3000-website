<<<<<<< HEAD:frontend/src/components/ShoppingList.jsx
import Item from "./Item";
import { useCart } from "../contexts/CartContext";
import "../styles/ShoppingList.css";
import { useEffect, useState } from "react";

function ShoppingList() {
  const { addToCart } = useCart();

  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        setItemList(data);
      })
      .catch((error) => {
        console.error("Erreur pour la récupération des vêtements: ", error);
      });
  }, []);

  return (
    <div className="shopping-list">
      <h2 className="shopping-list-title">Sport 3000 Products</h2>

      <div className="items-container">
        {itemList.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.cover}
            description={
              item.description || "Premium sports equipment for athletes."
            }
            onSale={item.onSale}
            salesPrice={item.salesPrice}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default ShoppingList;
=======
import Item from './Item';
import merchs from '../datas/merchs.json';
import { useCart } from '../contexts/CartContext';
import '../styles/ShoppingList.css';

function ShoppingList() {
    const { addToCart } = useCart();
    
    return (
        <div className="shopping-list">
            <h2 className="shopping-list-title">Sport 3000 Products</h2>
            
            <div className="items-container">
                {merchs.map(item => (
                    <Item 
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.img}
                        description={item.description || "Premium sports equipment for athletes."}
                        onSale={item.onSale}
                        salesPrice={item.salesPrice}
                        onAddToCart={() => addToCart(item)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ShoppingList;
>>>>>>> 252aa09 (feat: went for tailwindcss):src/components/ShoppingList.jsx

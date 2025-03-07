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
                        onAddToCart={() => addToCart(item)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ShoppingList;
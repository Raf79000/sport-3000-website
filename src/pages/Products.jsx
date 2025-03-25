import {CartProvider} from '../contexts/CartContext';
import Cart from '../components/Cart';
import ShoppingList from '../components/ShoppingList';


function Products() {
  return (
    <CartProvider>
        <ShoppingList />
        <Cart />
    </CartProvider>
  );
}
export default Products;
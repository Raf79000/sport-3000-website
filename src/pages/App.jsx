import "../styles/App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import ShoppingList from "../components/ShoppingList";
import { CartProvider } from "../contexts/CartContext";

export default function App() {
  return (
    <div className="App">
      <CartProvider>
        <Header />
        <ShoppingList />
        <Cart />
        <Footer />
      </CartProvider>
    </div>
  );
}

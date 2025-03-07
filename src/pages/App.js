import '../styles/App.css';
import Header from '../components/Header';
import Cart from '../components/Cart';
import ShoppingList from '../components/ShoppingList';
import Footer from '../components/Footer';
import { CartProvider } from '../contexts/CartContext';

function App() {
  return (
    <div className="App">
      <Header />
      <CartProvider>
        <ShoppingList />
        <Cart />
      </CartProvider>
      <Footer />
    </div>
  );
}

export default App;

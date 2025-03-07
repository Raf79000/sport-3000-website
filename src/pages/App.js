import '../styles/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Products from './Products';
import About from './About';
import Contact from './Contact';
import Checkout from './Checkout';
import { CartProvider } from '../contexts/CartContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;

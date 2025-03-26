import "../styles/App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShoppingList from "../components/ShoppingList";
import Cart from "../components/Cart";

function App() {
  return (
    <div className="App">
      <Header />
      <ShoppingList />
      <Cart />
      <Footer />
    </div>
  );
}

export default App;

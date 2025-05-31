import Header from "../components/Header";
import Footer from "../components/Footer";
import ShoppingList from "../components/ShoppingList";
import Cart from "../components/Cart";
import "../styles/App.css";

function App() {
  return (
    <div>
      <Header />
      {/* Main content area for the homepage */}
      <main>
        <ShoppingList />
        <Cart />
      </main>
      <Footer />
    </div>
  );
}

export default App;

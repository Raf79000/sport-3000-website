import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginDetail from "../components/LoginDetail";
import "../styles/App.css";

function Login() {
  return (
    <div>
      <Header />
      <main>
        <LoginDetail />
      </main>
      <Footer />
    </div>
  );
}

export default Login;

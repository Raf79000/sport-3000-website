import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileDetail from "../components/ProfileDetail";
import "../styles/App.css";

function Profile() {
  return (
    <div>
      <Header />
      {/* Wrap the detail component in our “main container” */}
      <main>
        <ProfileDetail />
      </main>
      <Footer />
    </div>
  );
}

export default Profile;

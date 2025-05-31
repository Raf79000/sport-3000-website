// ProfileDetail.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrencySign } from "../contexts/CurrencySignContext";
import "../styles/App.css";

function ProfileDetail() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [language, setLanguage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { sign, setSign } = useCurrencySign();

  if (!localStorage.getItem("token")) {
    return (
      <div>
        <header>
          <h2>Veuillez vous connecter pour accéder à votre profil</h2>
        </header>
        <main>
          <Link to="/login">Se connecter</Link>
        </main>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return (
      <div>
        <header>
          <h2>Vous êtes déconnecté</h2>
        </header>
        <main>
          <Link to="/login">Se connecter</Link>
        </main>
      </div>
    );
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Account deleted successfully");
            window.location.href = "/login";
          } else {
            console.error("Error deleting account");
            alert("Error deleting account");
          }
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Error deleting account");
        });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
  };

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  console.log("Token utilisateur :", token);
  console.log("ID utilisateur :", userId);

  return (
    <div>
      <header>
        <h2>Profil Utilisateur</h2>
      </header>
      <main>
        <p>ID de l'utilisateur : {userId}</p>
        <button onClick={handleLogout}>
          Se déconnecter
        </button>
        {editMode ? (
          <form onSubmit={handleSave}>
            <label>
              Nom d'utilisateur :
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-sm"
              />
            </label>
            <label>
              Mot de passe :
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-sm"
              />
            </label>
            <label>
              Email :
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-sm"
              />
            </label>
            <label>
              Téléphone :
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-sm"
              />
            </label>
            <label>
              Adresse :
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-sm"
              />
            </label>
            <label>
              Langue :
              <select
                value={language}
                onChange={handleLanguageChange}
                className="p-sm"
              >
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
              </select>
            </label>
            <label>
              Devise :
              <select
                value={sign}
                onChange={(e) => setSign(e.target.value)}
                className="p-sm"
                style={{ margin: "0 1rem" }}
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
              </select>
            </label>
            <button type="submit">
              Enregistrer
            </button>
          </form>
        ) : (
          <>
            <p>Nom d'utilisateur : {username}</p>
            <p>Mot de passe : {password}</p>
            <p>Email : {email}</p>
            <p>Téléphone : {phone}</p>
            <p>Adresse : {address}</p>
            <p>Langue : {language}</p>
            <p>Devise : {sign}</p>
            <button onClick={() => setEditMode(true)}>
              Modifier
            </button>
          </>
        )}
        <button onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </main>
    </div>
  );
}

export default ProfileDetail;

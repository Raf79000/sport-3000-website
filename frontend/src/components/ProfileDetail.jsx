import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCurrencySign } from "../contexts/CurrencySignContext";
import "../styles/App.css";

function ProfileDetail() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "fr");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const { sign, setSign } = useCurrencySign();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) return;

    fetch(`http://localhost:3000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des données utilisateur.");
        return res.json();
      })
      .then((data) => {
        setUsername(data.username || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setLanguage(localStorage.getItem("language") || data.language || "fr");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fetch user:", err);
        setLoading(false);
      });
  }, [token, userId]);

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
      window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")
    ) {
      fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "/login";
          } else {
            alert("Erreur lors de la suppression du compte.");
          }
        })
        .catch((err) => {
          console.error("Erreur suppression compte:", err);
          alert("Erreur lors de la suppression du compte.");
        });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/user/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        address,
        language,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la mise à jour");
        return res.json();
      })
      .then(() => {
        setEditMode(false);
        localStorage.setItem("language", language);
      })
      .catch((err) => {
        console.error("Erreur update:", err);
        alert("Échec de la mise à jour.");
      });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
  };


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
 
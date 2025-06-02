// ProfileDetail.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrencySign } from "../contexts/CurrencySignContext";
import "../styles/App.css";

function ProfileDetail() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone_number, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "fr"
  );
  const [editMode, setEditMode] = useState(false);

  const { sign, setSign } = useCurrencySign();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect immediately
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 404) {
          // User deleted or not found -> redirect
          navigate("/login");
          throw new Error("User not found");
        }
        if (!res.ok) {
          throw new Error(
            "Erreur lors de la récupération des données utilisateur."
          );
        }
        return res.json();
      })
      .then((data) => {
        setUsername(data.username || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phone_number || "");
        setAddress(data.address || "");
        setLanguage(localStorage.getItem("language") || data.language || "fr");
      })
      .catch((err) => {
        console.error("Erreur fetch user:", err);
        // On any other error redirect to login
        navigate("/login");
      });
  }, [token, userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
      )
    ) {
      fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/login");
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone_number,
        address,
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
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
            <button type="submit">Enregistrer</button>
          </form>
        ) : (
          <>
            <p>Nom d'utilisateur : {username}</p>
            <p>Email : {email}</p>
            <p>Téléphone : {phone_number}</p>
            <p>Adresse : {address}</p>
            <p>Langue : {language}</p>
            <p>Devise : {sign}</p>
            <button onClick={() => setEditMode(true)}>Modifier</button>
          </>
        )}
        <button onClick={handleLogout}>Se déconnecter</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </main>
    </div>
  );
}

export default ProfileDetail;

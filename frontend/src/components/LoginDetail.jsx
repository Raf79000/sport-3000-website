import React, { useState, useEffect } from "react";
function LoginDetail() {
  useEffect(() => {
    // Vérifiez si un token est déjà stocké localement
    const token = localStorage.getItem("token");
    if (token) {
      // Si un token est présent, redirigez l'utilisateur vers la page de profil
      window.location.href = "/profile";
    }
  }, []); // Utilisez un tableau vide pour exécuter cet effet uniquement une fois au chargement initial
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Ajout d'un état pour gérer le mode d'inscription ou de connexion
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:3000/signup"
        : "http://localhost:3000/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        // Si la réponse n'est pas OK, gérer l'erreur
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const token = data.token;
      // Stockez le token dans le stockage local
      localStorage.setItem("token", token);
      // Stockez l'ID de l'utilisateur dans le stockage local
      const userId = data.userId;
      localStorage.setItem("userId", userId);
      // Redirection de l'utilisateur vers une page de gestion du profil
      window.location.href = "/profile";
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      // Affichez un message d'erreur à l'utilisateur
      setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
    }
  };
  return (
    <div>
      <h2>{isSignup ? "Inscription" : "Connexion"}</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isSignup ? "S'inscrire" : "Se connecter"}
        </button>
      </form>
      <p>
        {isSignup
          ? "Vous avez déjà un compte ?"
          : "Vous n'avez pas de compte ?"}
      </p>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Se connecter" : "S'inscrire"}
      </button>
    </div>
  );
}
export default LoginDetail;

document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("register__button");

  registerBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data.message === "success") {
      window.location.href = "/login";
    } else {
      alert("Erreur lors de la création de l'utilisateur");
    }
  });
});

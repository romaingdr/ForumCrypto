document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login__btn");

  loginBtn.addEventListener("click", async () => {
    const errorMsg = document.getElementById("error__message");
    errorMsg.innerHTML = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.message === "success") {
      window.location.href = "/";
    } else {
      errorMsg.innerHTML = "Mot de passe ou email incorrect";
    }
  });
});

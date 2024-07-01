document.addEventListener("DOMContentLoaded", function () {
  const username = window.location.pathname.split("/")[2];
  fetch(`http://localhost:3000/api/user/${username}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        document.querySelector(
          ".container"
        ).innerHTML = `<h1 class="user__not__found">Cet utilisateur n'existe pas</h1>`;
      } else {
        const user = data[0];
        document.querySelector(".container").innerHTML = `
                    <div class="user__info">
                        <img src="http://localhost:3000/assets/img/profile_pics/${user.profile_pic}" alt="Avatar de ${user.username}" class="user__avatar">
                        <h1 class="user__username">${user.username}</h1>
                    </div>
                    `;

        fetch(`http://localhost:3000/api/user/`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            const currentUser = data[0];
            if (currentUser) {
              getFriendStatus(currentUser.user_id, user.user_id);
            } else {
              const container = document.querySelector(".user__info");
              const addFriendBtn = document.createElement("a");
              addFriendBtn.classList.add("add__friend__btn");
              addFriendBtn.innerHTML = `<i class='bx bx-user-plus'></i>Ajouter un ami`;
              container.appendChild(addFriendBtn);
              addFriendBtn.addEventListener("click", () => {
                window.location.replace("/login");
              });
            }
          });
      }
    });
});

function getFriendStatus(currentUser_id, user_id) {
  const username = window.location.pathname.split("/")[2];
  fetch(`http://localhost:3000/api/friendship/${currentUser_id}/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".user__info");
      if (data.status === "pending") {
        const addFriendBtn = document.createElement("a");
        addFriendBtn.classList.add("pending__friend");
        addFriendBtn.innerHTML = `<i class='bx bx-user'></i>Demande d'ami en attente`;
        container.appendChild(addFriendBtn);
      } else if (data.status === "accepted") {
        const addFriendBtn = document.createElement("a");
        addFriendBtn.classList.add("is__friend");
        addFriendBtn.innerHTML = `<i class='bx bxs-user-check'></i>Ami`;
        container.appendChild(addFriendBtn);
      } else {
        const addFriendBtn = document.createElement("a");
        addFriendBtn.classList.add("add__friend__btn");
        addFriendBtn.innerHTML = `<i class='bx bx-user-plus'></i>Ajouter un ami`;
        container.appendChild(addFriendBtn);
        addFriendBtn.addEventListener("click", () => {
          sendFriendRequest(currentUser_id, user_id);
        });
      }
    });
}

function sendFriendRequest(id_sender, id_receiver) {
  fetch("http://localhost:3000/api/friend_requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_sender: id_sender,
      id_receiver: id_receiver,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "success") {
        location.reload();
      } else {
        console.error("Erreur lors de l'envoi de la demande d'ami");
      }
    });
}

function showUserInfo() {
  const username = window.location.pathname.split("/")[2];
  fetch(`http://localhost:3000/api/user/${username}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        document.querySelector(
          ".container"
        ).innerHTML = `<h1 class="user__not__found">Cet utilisateur n'existe pas</h1>`;
      } else {
        const user = data[0];
        const createdAt = new Date(user.created_at).toLocaleString();
        const lastConnected = user.last_connected
          ? new Date(user.last_connected).toLocaleString()
          : "Never";

        document.querySelector(".container").innerHTML = `
            <div class="user__info">
                <img src="http://localhost:3000/assets/img/profile_pics/${
                  user.profile_pic
                }" alt="Avatar de ${user.username}" class="user__avatar">
                <h1 class="user__username">${user.username}</h1>
                
                <p class="user__created_at">Créé à: ${createdAt}</p>
                <p class="user__biography">Biographie: ${
                  user.biography || "Aucune biographie disponible"
                }</p>
                <p class="user__last_connected">Connecté pour la derniere fois: ${lastConnected}</p>
                
            </div>
          `;
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Appeler la fonction showUserInfo lorsque le document est chargé
document.addEventListener("DOMContentLoaded", function () {
  showUserInfo();
});

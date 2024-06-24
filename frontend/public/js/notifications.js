let user_id;
document.addEventListener('DOMContentLoaded', function() {
    fetch(`http://localhost:3000/api/user/`, {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            const currentUser = data[0];
            if (currentUser) {
                user_id = currentUser.user_id;
                fetchFriendsRequests(user_id);
            } else {
                window.location.href = "/login";
            }
        });

    fetchFriendsRequests();
});

function fetchFriendsRequests(userId) {
    fetch(`http://localhost:3000/api/friend_requests/${userId}`, {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            const notifications = document.querySelector(".notifications_list");
            const friendRequests = data;
            let pendingRequestsFound = false;
            if (friendRequests.length === 0) {
                notifications.innerHTML = "<p class='no__notifications'>Vous n'avez pas de notifications</p>";
            } else {
                notifications.innerHTML = "";
                friendRequests.forEach(friendRequest => {
                    if (friendRequest.status !== "pending") return;
                    pendingRequestsFound = true;
                    const notification = document.createElement("div");
                    notification.classList.add("notification");
                    notification.innerHTML = `
                        <img onclick="window.location.href='/p/${friendRequest.username}'" class="user__avatar" src="/public/img/${friendRequest.profile_pic}" alt="avatar">
                        <p>${friendRequest.username} souhaite devenir votre ami</p>
                        <div class="notification__actions">
                            <button class="accept__friend" data-id="${friendRequest.id}">Accepter</button>
                            <button class="reject__friend" data-id="${friendRequest.id}">Rejeter</button>
                        </div>
                    `;
                    notifications.appendChild(notification);
                });
                if (!pendingRequestsFound) {
                    notifications.innerHTML = "<p class='no__notifications'>Vous n'avez pas de notifications</p>";
                }

            }

            const acceptButtons = document.querySelectorAll('.accept__friend');
            const rejectButtons = document.querySelectorAll('.reject__friend');

            acceptButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const friendRequestId = this.getAttribute('data-id');
                    acceptRequest(friendRequestId);
                });
            });

            rejectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const friendRequestId = this.getAttribute('data-id');
                    rejectRequest(friendRequestId)
                });
            });
        });
}

function acceptRequest(requestId) {
    fetch(`http://localhost:3000/api/friend_requests/accept/${requestId}`, {
        method: 'PUT',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.message === "success") {
                showPopup("Demande d'ami acceptée", "#4CAF50");
                fetchFriendsRequests(user_id)
            } else {
                showPopup("Une erreur s'est produite lors de l'acceptation de la demande d'ami", "#FF5252")
                console.log("Une erreur s'est produite lors de l'acceptation de la demande d'ami");
            }
        });
}

function rejectRequest(requestId) {
    fetch(`http://localhost:3000/api/friend_requests/reject/${requestId}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.message === "success") {
                if (data.message === "success") {
                    showPopup("Demande d'ami refusée", "#FF5252");
                    fetchFriendsRequests(user_id)
                } else {
                    showPopup("Une erreur s'est produite lors du rejet de la demande d'ami", "#FF5252")
                    console.log("Une erreur s'est produite lors du rejet de la demande d'ami");
                }
            }
        });
}


// Popups confirmation

function showPopup(text, color) {
    const popup = document.getElementById('success-popup');
    popup.innerHTML = text;
    popup.style.backgroundColor = color;
    popup.classList.remove('hidden');
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 500);
    }, 2000);
}
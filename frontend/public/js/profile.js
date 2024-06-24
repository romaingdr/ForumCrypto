let user_id;

document.addEventListener('DOMContentLoaded', function() {
    fetchProfileInfos();


    const popup = document.getElementById('popup');

    const friendsBtn = document.querySelector('.user__friends__btn');

    const closePopupBtn = document.getElementById('closePopupBtn');

    friendsBtn.onclick = function() {
        fetchFriends();

        popup.style.display = 'block';
    }

    closePopupBtn.onclick = function() {
        popup.style.display = 'none';
    }

    window.onclick = function(event) {

        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }
});

function fetchProfileInfos() {
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                const user = data[0]
                console.log(user);
                if (user) {
                    user_id = user.user_id;

                    const profilePicture = document.getElementById('user_picture')
                    profilePicture.src = "/public/img/" + user.profile_pic;

                    const username = document.getElementById('user_name')
                    username.textContent = user.username;

                    const biography = document.getElementById('user_biography')
                    biography.textContent = user.biography;

                    const creationDate = document.getElementById('user_created_at')

                    const date = new Date(user.created_at);
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const year = date.getUTCFullYear();

                    creationDate.textContent = `Membre depuis le ${day}/${month}/${year}`;
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la session:', error);
        });
}


function fetchFriends() {
    const friendList = document.querySelector('.friends_list')
    fetch(`http://localhost:3000/api/friends/${user_id}`, {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            const friends = data;
            if (friends.length === 0) {
                friendList.innerHTML = "<p class='no__friends'>Vous n'avez pas d'amis pour le moment</p>";
            } else {
                friendList.innerHTML = "";
                friends.forEach(friend => {
                    const friendContainer = document.createElement('div')
                    friendContainer.classList.add('friend')

                    const friendPicture = document.createElement('img')
                    friendPicture.src = "/public/img/" + friend.profile_pic
                    friendPicture.alt = "Photo de profil de l'ami"

                    const friendUsername = document.createElement('p')
                    friendUsername.textContent = friend.username

                    friendContainer.appendChild(friendPicture)
                    friendContainer.appendChild(friendUsername)

                    friendContainer.addEventListener('click', function() {
                        window.location.href = "/p/" + friend.username
                    })
                    friendList.appendChild(friendContainer);
                });
            }

        });
    console.log(user_id);
}
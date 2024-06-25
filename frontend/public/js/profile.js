let user_id;

document.addEventListener('DOMContentLoaded', function() {

    // Récupération des informations de l'utilisateur
    fetchProfileInfos();

    // Popup pour afficher les amis
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

    // Popup d'edtion de la photo de profil

    var modal = document.getElementById("uploadModal");
    var btn = document.getElementById("edit-icon");
    var span = document.getElementsByClassName("close")[0];
    var fileInput = document.getElementById("fileInput");
    var imagePreview = document.getElementById("imagePreview");

    btn.onclick = function() {
        fileInput.value = "";
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    fileInput.onchange = function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                console.log("Previewing image:", file.name);
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            }
            reader.readAsDataURL(file);
        }
    }

    document.getElementById("uploadForm").onsubmit = function(event) {
        event.preventDefault();
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (file) {
            console.log("Uploading file:", file.name);
            var formData = new FormData();
            formData.append("file", file);

            fetch("http://localhost:3000/api/user/modify_picture", {
                method: "POST",
                credentials: 'include',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Upload successful:', data);
                    modal.style.display = "none";
                })
                .catch(error => {
                    console.error('Error during upload:', error);
                });
        }
    };

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
                    profilePicture.src = "http://localhost:3000/assets/img/profile_pics/" + user.profile_pic;

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
                    friendPicture.src = "http://localhost:3000/assets/img/profile_pics/" + friend.profile_pic
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
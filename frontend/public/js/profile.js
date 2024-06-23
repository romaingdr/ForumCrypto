document.addEventListener('DOMContentLoaded', function() {
    fetchProfileInfos();
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
                    const userInfos = document.querySelector('.main__infos');
                    const pictureDisplay = document.querySelector('.picture__display');
                    const bioDisplay = document.querySelector('.biography');

                    const profilePicture = document.createElement('img');
                    profilePicture.src = "/public/img/" + user.profile_pic;
                    profilePicture.alt = "Profile picture";
                    profilePicture.classList.add('profile__picture');

                    const username = document.createElement('h2');
                    username.textContent = user.username;
                    username.classList.add('profile__username');

                    const biography = document.createElement('p');
                    biography.textContent = user.biography;
                    biography.classList.add('profile__biography');

                    const email = document.createElement('p');
                    email.textContent = "email : " + user.email;
                    email.classList.add('profile__email');

                    pictureDisplay.appendChild(profilePicture);
                    userInfos.appendChild(username);
                    userInfos.appendChild(email);
                    bioDisplay.appendChild(biography);
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la session:', error);
        });
}
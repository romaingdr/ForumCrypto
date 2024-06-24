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
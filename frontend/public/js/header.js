document.addEventListener('DOMContentLoaded', function() {
    loadSession();
});

function loadSession() {
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
                const loginButton = document.getElementById('login__button');
                if (data[0].username) {
                    loginButton.innerHTML = "<i class='bx bx-user' color='white'></i>" + " " + data[0].username;
                    loginButton.href = "/profile";
                } else {
                    loginButton.textContent = "Login";
                    loginButton.href = "/login";
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la session:', error);
        });
}
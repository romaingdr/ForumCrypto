document.addEventListener('DOMContentLoaded', function () {
    loadSession();

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                const searchUrl = `/search?q=${encodeURIComponent(query)}`;
                window.location.href = searchUrl;
            }
        }
    });
});

function loadSession() {
    const loginButton = document.getElementById('login__button');
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
                loginButton.textContent = "Login";
                loginButton.href = "/login";
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
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
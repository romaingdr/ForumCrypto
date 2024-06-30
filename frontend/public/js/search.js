document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    console.log(searchQuery);
    if (searchQuery.length < 3) {
        container.innerHTML = '<h1 class="no__query">Veuillez spécifier au moins 3 caractères</h1>' +
            '<a href="/" class="home__btn">Retour à l\'accueil</a>';
        return;
    }

    fetch(`http://localhost:3000/api/search?q=${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des résultats de recherche');
            }
            return response.json();
        })
        .then(data => {
            const users = data.users;
            const topics = data.topics;
            const tags = data.tags;

            if (users.length === 0 && topics.length === 0 && tags.length === 0) {
                container.innerHTML = `<h1 class="no__query">Aucun résultat trouvé pour '${searchQuery}'</h1>' +
                    '<a href="/" class="home__btn">Retour à l\'accueil</a>;`
                return;
            }


            // Affichage des utilisateurs trouvés

            if (users.length > 0) {
                const usersContainer = document.createElement('div');
                usersContainer.classList.add('search__users');
                const usersTitle = document.createElement('h2');
                usersTitle.classList.add('user__title');
                usersTitle.textContent = 'Utilisateurs';
                usersContainer.appendChild(usersTitle);
                container.appendChild(usersContainer);
            }

            users.forEach(user => {
                const userContainer = document.createElement('div');
                userContainer.classList.add('user');
                userContainer.innerHTML += `
                        <img src="http://localhost:3000/assets/img/profile_pics/${user.profile_pic}" alt="Photo de profil" class="search__user__img">
                        <h3 class="search__user__name">${user.username}</h3>
                `;
                userContainer.addEventListener('click', () => {
                    window.location.href = `/p/${user.username}`;
                });
                const usersContainer = document.querySelector('.search__users');
                usersContainer.appendChild(userContainer);
            });


            // Affichage des topics trouvés

            if (topics.length > 0) {
                const topicsContainer = document.createElement('div');
                topicsContainer.classList.add('search__topics');
                const topicsTitle = document.createElement('h2');
                topicsTitle.classList.add('topics__title');
                topicsTitle.textContent = 'Topics';
                topicsContainer.appendChild(topicsTitle);
                container.appendChild(topicsContainer);
            }

            topics.forEach(topic => {
                if (topic.status === 'public') {
                    const topicContainer = document.createElement('div');
                    topicContainer.classList.add('topic');
                    topicContainer.innerHTML += `
                        <h3 class="search__topic__title">${topic.title}</h3>
                        <p class="search__topic__content">${topic.description}</p>
                `;
                    topicContainer.addEventListener('click', () => {
                        window.location.href = `/t/${topic.id_topic}`;
                    });
                    const topicsContainer = document.querySelector('.search__topics');
                    topicsContainer.appendChild(topicContainer);
                }
            });

            // Affichage des tags trouvés

            if (tags.length > 0) {
                const tagsContainer = document.createElement('div');
                tagsContainer.classList.add('search__tags');
                const tagsTitle = document.createElement('h2');
                tagsTitle.classList.add('tags__title');
                tagsTitle.textContent = 'Contient le tag : ' + searchQuery;
                tagsContainer.appendChild(tagsTitle);
                container.appendChild(tagsContainer);
            }

            console.log(tags);
            tags.forEach(tag => {
                const tagContainer = document.createElement('div');
                tagContainer.classList.add('tag__topic');
                tagContainer.innerHTML += `
                    <h3>${tag.topic_title}</h3>
                    <p>${tag.topic_description}</p>
            `;
                tagContainer.addEventListener('click', () => {
                    window.location.href = `/t/${tag.id_topic}`;
                });
                const tagsContainer = document.querySelector('.search__tags');
                tagsContainer.appendChild(tagContainer);
            });

        });

});
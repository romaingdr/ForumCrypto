document.addEventListener('DOMContentLoaded', () => {
    // Toggle entre posts du général et des suivis
    const notSelectedPosts = document.querySelector('.not_selected__posts');
    const selectedPosts = document.querySelector('.selected__posts');

    let allTopics = [];
    let allFriends = [];

    function getTopics() {
        return fetch('http://localhost:3000/api/topic')
            .then(response => response.json())
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getTopics().then(data => {
        allTopics = data;
        displayTopics(allTopics);
    });

    function getFriends() {
        return fetch('http://localhost:3000/api/friends', {
            credentials: 'include'
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getFriends().then(data => {
        data.forEach(friend => {
            allFriends.push(friend.user_id);
        })
    });

    function toggleSelection(clickedElement, otherElement) {
        clickedElement.classList.add('selected__posts');
        clickedElement.classList.remove('not_selected__posts');
        otherElement.classList.add('not_selected__posts');
        otherElement.classList.remove('selected__posts');
    }

    notSelectedPosts.addEventListener('click', () => {
        // Topics suivis
        console.log(allFriends);
        displayTopics(allTopics.filter(topic => allFriends.includes(topic.user_id)), true);
        toggleSelection(notSelectedPosts, selectedPosts);
    });

    selectedPosts.addEventListener('click', () => {
        // Topics généraux
        displayTopics(allTopics);
        toggleSelection(selectedPosts, notSelectedPosts);
    });

    // Affichage des catégories
    const categoriesArrow = document.getElementById('categories__arrow')
    const categoriesList = document.querySelector('.categories_list');

    fetchCategories()

    categoriesArrow.addEventListener('click', () => {
        if (categoriesArrow.classList.contains('bx-chevron-right')) {
            categoriesArrow.classList.remove('bx-chevron-right');
            categoriesArrow.classList.add('bx-chevron-down');
            categoriesList.style.display = 'flex';
        } else {
            categoriesArrow.classList.remove('bx-chevron-down');
            categoriesArrow.classList.add('bx-chevron-right');
            categoriesList.style.display = 'none';
        }
    });

    const cryptoArrow = document.getElementById('crypto__arrow')
    const cryptoList = document.querySelector('.crypto__price');
    const moreCryptoButton = document.getElementById('toggleButton');

    // Affichage des cryptos avec l'api coinGecko
    fetchCoinGeckoData().then(data => {
        displayData(data);
    });

    cryptoArrow.addEventListener('click', () => {
        if (cryptoArrow.classList.contains('bx-chevron-right')) {
            cryptoArrow.classList.remove('bx-chevron-right');
            cryptoArrow.classList.add('bx-chevron-down');
            cryptoList.style.display = 'block';
            moreCryptoButton.style.display = 'block';
        } else {
            cryptoArrow.classList.remove('bx-chevron-down');
            cryptoArrow.classList.add('bx-chevron-right');
            cryptoList.style.display = 'none';
            moreCryptoButton.style.display = 'none';
        }
    });

    // Redirection vers la page de création de topic

    const redirectTopic = document.querySelector('.new__post__button');

    redirectTopic.addEventListener('click', () => {
        window.location.href = '/topic';
    });

});



// Fonction pour afficher les topics

function displayTopics(data, friend = false) {
    const topics = document.querySelector('.topics');
    topics.innerHTML = '';

    data.forEach(topic => {
        // Check if the topic should be displayed based on its status and the friend parameter
        if (topic.status !== 'archived' && (friend || topic.status === 'public')) {

            const topicElement = document.createElement('div');

            const date = new Date(topic.created_at);
            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const year = date.getUTCFullYear();

            const tags = topic.tags;
            const tagsArray = tags.split(',');

            topicElement.className = 'topic';
            topicElement.innerHTML = `
                <div class="topic__main_infos">
                    <h3 class="topic_title">${topic.title}</h3>
                    <p class="topic_date">${day}/${month}/${year}</p>
                </div>
                <div class="topic__tags">
                    ${tagsArray.map(tag => `<span class="tag">#${tag.trim()}</span>`).join('')}
                </div>
                <div class="topic_description">
                    <p>${topic.description}</p>
                </div>
                <div class="topic__other_infos">
                    <div class="topic_user">
                        <img class="user_profile_pic" src="http://localhost:3000/assets/img/profile_pics/${topic.profile_pic}">
                        <p class="topic_username">${topic.username}</p>
                    </div>
                    <div class="topic__category">
                        <p>${topic.category_title}</p>
                    </div>
                </div>`;

            topicElement.addEventListener('click', () => {
                window.location.href = `/t/${topic.id_topic}`;
            });

            topics.appendChild(topicElement);

        }
    });
}


// Fonction pour récupérer toutes les catégories du forum
function fetchCategories() {
    const categoriesList = document.querySelector('.categories_list');
    categoriesList.style.display = 'none';

    fetch('http://localhost:3000/api/categories')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                const categoryElement = document.createElement('a');
                categoryElement.textContent = category.title;
                categoryElement.href = `/c/${category.title}`;
                categoriesList.appendChild(categoryElement);
            });
        });
}


// Fonction pour récupérer les données des cryptos avec l'api CoinGecko
async function fetchCoinGeckoData() {
    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const params = new URLSearchParams({
        vs_currency: "usd",
        per_page: 8,
        page: 1
    });

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}



// Fonction pour afficher les données des cryptos
function displayData(data, showAll = false) {
    const cryptoPrice = document.querySelector('.crypto__price');
    if (!cryptoPrice) {
        console.error('Element with id "crypto__price" not found');
        return;
    }
    cryptoPrice.innerHTML = '';
    if (!data) {
        console.error('Data is undefined or null');
        return;
    }
    const coinsToDisplay = showAll ? data : data.slice(0, 4);
    coinsToDisplay.forEach(coin => {
        const cryptoItem = document.createElement('div');
        cryptoItem.className = 'crypto-item';
        cryptoItem.innerHTML = `
            <img class="crypto__img" src="${coin.image}" alt="${coin.id}">
            <p class="crypto-name">${coin.name}</p>
            <p class="crypto-price">${coin.current_price}$</p>
        `;
        cryptoPrice.appendChild(cryptoItem);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchCoinGeckoData();
    displayData(data);

    const toggleButton = document.getElementById('toggleButton');
    let showAll = false;

    toggleButton.addEventListener('click', () => {
        showAll = !showAll;
        displayData(data, showAll);
        toggleButton.textContent = showAll ? 'Voir moins' : 'Voir plus';
    });
});

const defile = document.querySelector('#categories__arrow');
const page = document.querySelector('.left__page__content');
const centerPage = document.querySelector('.center__page__content');
let isExpanded = false;

function handleClick() {
    const isMobile = window.matchMedia("(max-width: 780px)").matches;
    if (isMobile) {
        if (isExpanded) {
            page.style.height = "10vh";
            centerPage.style.marginTop = "0vh";
        } else {
            page.style.height = "35vh";
            centerPage.style.marginTop = "25vh";
        }
        isExpanded = !isExpanded;
    }
}

defile.addEventListener('click', handleClick);

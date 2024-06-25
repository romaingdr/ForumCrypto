document.addEventListener('DOMContentLoaded', () => {
    const categoriesArrow = document.getElementById('categories__arrow')
    const categoriesList = document.querySelector('.categories_list')
    const notSelectedPosts = document.querySelector('.not_selected__posts');
    const selectedPosts = document.querySelector('.selected__posts');

    function toggleSelection(clickedElement, otherElement) {
        clickedElement.classList.add('selected__posts');
        clickedElement.classList.remove('not_selected__posts');
        otherElement.classList.add('not_selected__posts');
        otherElement.classList.remove('selected__posts');
    }

    notSelectedPosts.addEventListener('click', () => {
        toggleSelection(notSelectedPosts, selectedPosts);
    });

    selectedPosts.addEventListener('click', () => {
        toggleSelection(selectedPosts, notSelectedPosts);
    });

    categoriesArrow.addEventListener('click', () => {
        if (categoriesArrow.classList.contains('bx-chevron-right')) {
            categoriesArrow.classList.remove('bx-chevron-right');
            categoriesArrow.classList.add('bx-chevron-down');
            showCategories();
        } else {
            categoriesArrow.classList.remove('bx-chevron-down');
            categoriesArrow.classList.add('bx-chevron-right');
            categoriesList.innerHTML = '';
        }
    });

    fetchCoinGeckoData().then(data => {
        displayData(data);
    });

});

function showCategories() {
    const categoriesList = document.querySelector('.categories_list');
    categoriesList.innerHTML = '<a>Blockchain</a>\n' +
        '<a>Crypto</a>\n' +
        '<a>Trading</a>\n' +
        '<a>Régulation</a>';
}

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
        console.log(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

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
            <span>${coin.name}: $${coin.current_price}</span>
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

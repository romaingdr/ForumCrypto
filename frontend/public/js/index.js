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
        per_page: 5,
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

function displayData(data) {
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
    data.forEach(coin => {
        const cryptoItem = document.createElement('div');
        cryptoItem.className = 'crypto-item';
        cryptoItem.innerHTML = `
            <img class="crypto__img" src="${coin.image}" alt="${coin.id}">
            <span>${coin.id}: $${coin.current_price}</span>
        `;
        cryptoPrice.appendChild(cryptoItem);
    });
}

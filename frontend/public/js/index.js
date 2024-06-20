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
            showCategories()
        } else {
            categoriesArrow.classList.remove('bx-chevron-down');
            categoriesArrow.classList.add('bx-chevron-right');
            categoriesList.innerHTML = ''
        }
    })

});

function showCategories() {
    const categoriesList = document.querySelector('.categories_list')
    categoriesList.innerHTML = '<a>Blockchain</a>\n' +
        '                <a>Crypto</a>\n' +
        '                <a>Trading</a>\n' +
        '                <a>Régulation</a>'
}
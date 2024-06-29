document.addEventListener('DOMContentLoaded', function() {
    const categoryName = window.location.pathname.split('/')[2];
    getCategory(categoryName);
});

function getCategory(categoryName) {
    fetch(`http://localhost:3000/api/categories/${categoryName}`)
        .then(response => response.json())
        .then(category => {
            const datas = category[0];

            getTopics(datas.id_category);

            const categoryElement = document.querySelector('.category__infos');
            categoryElement.innerHTML = `
            <div class="category__infos__header">
                <img src="/public/img/categories/${datas.image_path}" alt="${datas.title}">
                <h1>c/${datas.title}</h1>
                <a><i class='bx bx-add-to-queue'></i>Suivre</a>
                <div class="more__infos">
                    <i id="more_infos" class='bx bxs-chevron-right'></i>
                </div>
            </div>
            <div class="category__infos__description">
                <p>${datas.description}</p>
            </div>
        `;

            const moreInfos = document.getElementById('more_infos');
            moreInfos.addEventListener('click', () => {
                const descriptionDiv = document.querySelector('.category__infos__description');
                if (descriptionDiv.style.display === 'none' || descriptionDiv.style.display === '') {
                    descriptionDiv.style.display = 'flex';
                    moreInfos.classList.remove('bxs-chevron-right');
                    moreInfos.classList.add('bxs-chevron-down');
                } else {
                    descriptionDiv.style.display = 'none';
                    moreInfos.classList.remove('bxs-chevron-down');
                    moreInfos.classList.add('bxs-chevron-right');
                }
            });

        });
}

function getTopics(categoryId) {
    fetch(`http://localhost:3000/api/topic/category/${categoryId}`)
        .then(response => response.json())
        .then(topics => {
            displayTopics(topics)
        });
}

function displayTopics(data) {
    const topics = document.querySelector('.topics');
    topics.innerHTML = '';
    data.forEach(topic => {
        const topicElement = document.createElement('div');

        const date = new Date(topic.created_at);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        const tags = topic.tags
        const tagsArray = tags.split(',');

        topicElement.className = 'topic';
        topicElement.innerHTML = `
                    <div class="topic__main_infos">
                        <h3 class="topic_title">${topic.title}</h3>
                        <p class="topic_date">${day}/${month}/${year}</p>
                    </div>
                    <div class="topic__tags">
                        ${tagsArray.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                    <div class="topic_description">
                        <p>${topic.description}</p>
                    </div>
                    <div class="topic__other_infos">
                        <div class="topic_user">
                            <img class="user_profile_pic" src="http://localhost:3000/assets/img/profile_pics/${topic.profile_pic}">
                            <p class="topic_username">${topic.username} </p>
                        </div>
                        <div class="topic__category">
                            <p>${topic.category_title}</p>
                        </div>
                    </div>                
                `;
        topics.appendChild(topicElement);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const idTopic = window.location.pathname.split('/').pop();
    displayTopic(idTopic)
});

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


function displayTopic(idTopic){
fetch(`http://localhost:3000/api/topic/${idTopic}`)
    .then(response => response.json())
    .then(data => {
        const topicInfos = data[0]
        const infosDiv = document.querySelector('.topic__infos');
        const headerDiv = document.querySelector('.topic__header');

        headerDiv.innerHTML = `
                <img src="http://localhost:3000/assets/img/profile_pics/${topicInfos.profile_pic}"  alt="avatar" class="topic__avatar">
                <p class="topic__author">${topicInfos.username} • </p>
                <h1 class="topic__title">${topicInfos.title}</h1>
                <div class="more__infos">
                    <i id="more_infos" class='bx bxs-chevron-right'></i>
                </div>
        `

        let tags = topicInfos.tags
        if (!tags) {
            tags = 'Aucun tag';
        }

        infosDiv.innerHTML = `
                <div class="topic__description">
                    <p>${topicInfos.description}</p>
                </div>
                <p>Tags : ${tags}</p>
                <p>Catégorie : ${topicInfos.category_title}</p>
                <p>Créé le ${formatDate(topicInfos.created_at)}</p>
        `
        const moreInfos = document.getElementById('more_infos');
        moreInfos.addEventListener('click', () => {
            if (infosDiv.style.display === 'none' || infosDiv.style.display === '') {
                infosDiv.style.display = 'flex';
                moreInfos.classList.remove('bxs-chevron-right');
                moreInfos.classList.add('bxs-chevron-down');
            } else {
                infosDiv.style.display = 'none';
                moreInfos.classList.remove('bxs-chevron-down');
                moreInfos.classList.add('bxs-chevron-right');
            }
        });
        const topicContainer = document.querySelector('.topic__container')
    })
    .catch(error => console.error(error));
}
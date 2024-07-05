document.addEventListener('DOMContentLoaded', function() {
    displayTopics();
});

function displayTopics() {
    const topicsContainer = document.querySelector('.topics__handler__container')
    fetch('http://localhost:3000/api/my-topics', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(topic => {

            const date = new Date(topic.created_at);
            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const year = date.getUTCFullYear();

            const tags = topic.tags;
            let tagsArray = [];

            if (tags) {
                tagsArray = tags.split(',');
            }

            const topicHandler = document.createElement('div');
            topicHandler.className = 'topic__handler';

            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic';
            topicDiv.innerHTML = `
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
                        <p class="topic_username">Statut : ${topic.status}</p>
                    </div>
                    <div class="topic__category">
                        <p>${topic.category_title}</p>
                    </div>
                </div>`;

            topicHandler.appendChild(topicDiv);

            const topicActions = document.createElement('div');
            topicActions.className = 'topic__actions';
            topicActions.innerHTML = `
                    <select class="status-select">
                        <option value="public" ${topic.status === 'public' ? 'selected' : ''}>Publique</option>
                        <option value="prive" ${topic.status === 'prive' ? 'selected' : ''}>Privé</option>
                        <option value="archive" ${topic.status === 'archive' ? 'selected' : ''}>Archiver</option>
                    </select>
                    <i class='bx bxs-trash bx-tada-hover trash-icon'></i>
                `;

            const deleteIcon = topicActions.querySelector('.trash-icon');
            deleteIcon.addEventListener('click', () => {
                fetch(`http://localhost:3000/api/topic/${topic.id_topic}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })
                .then(response => {
                    if (response.status === 200) {
                        topicHandler.remove();
                    }
                })
            })

            const statusSelect = topicActions.querySelector('.status-select');
            statusSelect.addEventListener('change', () => {
                fetch(`http://localhost:3000/api/topic/${topic.id_topic}/status`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: statusSelect.value
                    })
                })
                .then(response => {
                    if (response.status === 200) {
                        topicDiv.querySelector('.topic_username').textContent = `Statut : ${statusSelect.value}`;
                    }
                })
            })

            topicHandler.appendChild(topicActions);

            topicsContainer.appendChild(topicHandler);
        })
    })
}
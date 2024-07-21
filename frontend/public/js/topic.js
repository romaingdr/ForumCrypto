document.addEventListener('DOMContentLoaded', () => {
    const idTopic = window.location.pathname.split('/').pop();

    // Charger les infos du topic
    displayTopic(idTopic)

    // Bouton pour envoyer une réponse au topic
    const messageButton = document.getElementById('post_message');
    messageButton.addEventListener('click', () => {
        const messageContent = document.getElementById('message_content').value;
        postMessage(messageContent);
    });

    // Récupérer les réponses au topic
    fetch(`http://localhost:3000/api/post/topic/${idTopic}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const posts = data;
            const postMap = new Map();
            const rootPosts = [];

            // Organiser les posts dans un Map pour un accès facile par id
            posts.forEach(post => {
                post.replies = [];
                postMap.set(post.id_post, post);
                if (!post.parent_post_id) {
                    rootPosts.push(post);
                }
            });

            // Assigner chaque post à son parent
            posts.forEach(post => {
                if (post.parent_post_id) {
                    const parentPost = postMap.get(post.parent_post_id);
                    if (parentPost) {
                        parentPost.replies.push(post);
                    }
                }
            });

            // Fonction pour générer le HTML des posts de manière récursive
            const generatePostHTML = (post, depth = 0) => {
                let toggleButton = post.replies.length > 0 ?
                    `<span class="comment__toggle" data-id="${post.id_post}">+</span>` : '';

                let postHTML = `
        <div class="comment" id="comment_${post.id_post}" style="margin-left: ${depth * 80}px;">
            <div class="comment__header">
                ${toggleButton}
                <img src="http://localhost:3000/assets/img/profile_pics/${post.profile_pic}" alt="avatar" class="comment__avatar">
                <p class="comment__author">${post.username}</p>
            </div>
            <div class="comment__content">
                <p class="comment__text">${post.content}</p>
                <div class="comment__votes">
                    <i class='bx bx-message-add new-reply' data-id=${post.id_post}></i>
                    <span class="nb__comment__replies">${post.replies.length}</span>
                    <i class='bx bx-upvote'></i>
                    <span class="nb__votes">0</span>
                    <i class='bx bx-downvote'></i>
                    <span class="nb__downvotes">0</span>
                </div>
            </div>
            <div class="comment__replies" id="replies_${post.id_post}" style="margin-left: ${depth * 30}px;">`;

                post.replies.forEach(reply => {
                    postHTML += generatePostHTML(reply, depth + 1);
                });

                postHTML += `</div></div>`;
                return postHTML;
            };

            const messageContainer = document.querySelector('.comments__container');
            rootPosts.forEach(post => {
                const postHTML = generatePostHTML(post);
                messageContainer.innerHTML += postHTML;
            });

            // Ajouter des gestionnaires d'événements pour les boutons de basculement
            document.querySelectorAll('.comment__toggle').forEach(toggleButton => {
                toggleButton.addEventListener('click', (event) => {
                    const postId = event.target.getAttribute('data-id');
                    const repliesContainer = document.getElementById(`replies_${postId}`);
                    if (repliesContainer.style.display === 'none' || !repliesContainer.style.display) {
                        repliesContainer.style.display = 'block';
                        event.target.textContent = '-';
                    } else {
                        repliesContainer.style.display = 'none';
                        event.target.textContent = '+';
                    }
                });
            });

            const replyButtons = document.querySelectorAll('.new-reply');

            replyButtons.forEach(replyButton => {
                replyButton.addEventListener('click', () => {
                    const postId = replyButton.dataset.id
                    console.log(postId)
                    const commentDiv = document.querySelector(`#comment_${postId}`)

                    const replyInputs = document.querySelectorAll('.reply__container')
                    replyInputs.forEach(replyInput => {
                        replyInput.remove()
                    });

                    const replyDiv = document.createElement('div')
                    replyDiv.classList.add('reply__container')

                    replyDiv.innerHTML = `
                    <div class="reply__container">
                        <input class="reply__input" type="text" placeholder="Répondre...">
                        <i class='bx bxs-send send_reply'></i>
                    </div>`

                    const sendReplyButton = replyDiv.querySelector('.send_reply')
                    sendReplyButton.addEventListener('click', () => {
                        const replyContent = replyDiv.querySelector('.reply__input').value
                        postMessage(replyContent, postId)
                    });

                    commentDiv.appendChild(replyDiv)
                });
            });
        });
});


function postMessage(messageContent, parentPostId=null) {
    const idTopic = window.location.pathname.split('/').pop();
    fetch('http://localhost:3000/api/post', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content:messageContent, parent_post_id:parentPostId, id_topic:idTopic})
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            } else {
                if (parentPostId) {
                    const commentDiv = document.querySelector(`#comment_${parentPostId}`)
                    const replyDiv = commentDiv.querySelector('.reply__container')
                    replyDiv.remove()
                }
                window.location.reload();
            }
        })
}

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
                    <i id="topic_messages" class='bx bx-message-add'><span class="nb__replies">0</span></i>
                    <div class="topic__votes">
                        <i class='bx bx-upvote'></i>
                        <span class="nb__votes">0</span>
                        <i class='bx bx-downvote' ></i>
                        <span class="nb__downvotes">0</span>
                    </div>
                    <i id="more_infos" class='bx bxs-chevron-right'></i>
                </iv>
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
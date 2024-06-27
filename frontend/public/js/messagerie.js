document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les conversations de l'utilisateur
    fetch(`http://localhost:3000/api/conversations`, {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {

            // Si l'utilisateur a des conversations
            if (data.length) {
                console.log(data);
                loadConversations(data);
            } else {
                // Affichage d'un message si l'utilisateur n'a pas de conversation
                const container = document.querySelector('.container');
                container.innerHTML = '';

                const title = document.createElement('h1');
                title.classList.add('title');
                title.textContent = "Messagerie";
                container.appendChild(title);

                const message = document.createElement('h2');
                message.textContent = "Vous n'avez pas de conversation";
                message.classList.add('no__conversation');
                container.appendChild(message);

                // Affichage des amis de l'utilisateur si il en a
                displayFriends();
            }
        })
});

function createConversation(friendId) {
        fetch('http://localhost:3000/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_user2: friendId}),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertId) {
                    window.location.reload();
                } else {
                    console.log(data);
                }
        })
}

function loadConversations(conversations) {
    const conversationsList = document.querySelector('.conversation__list');

    conversations.forEach(conversation => {
        const conversationDiv = document.createElement('div');
        conversationDiv.classList.add('conversation');
        conversationDiv.dataset.id = conversation.conversation_id;

        const userPic = document.createElement('img');
        userPic.src = "http://localhost:3000/assets/img/profile_pics/" + conversation.other_user_profile_pic;
        userPic.alt = "profile_pic";
        conversationDiv.appendChild(userPic);

        const username = document.createElement('p');
        username.textContent = conversation.other_user_username;
        conversationDiv.appendChild(username);

        conversationDiv.addEventListener('click', function() {
            const allConversations = document.querySelectorAll('.selected_conversation');
            allConversations.forEach(conversation => {
                conversation.classList.remove('selected_conversation');
                conversation.classList.add('conversation');
            });
            conversationDiv.classList.remove('conversation');
            conversationDiv.classList.add('selected_conversation');
            loadConversationMessages(conversation.conversation_id);
        });

        conversationsList.appendChild(conversationDiv);
    });

}

function displayFriends(){
    const container = document.querySelector('.container');

    fetch(`http://localhost:3000/api/friends`, {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.length) {
                const friends = data;

                const friendsContainer = document.createElement('div');
                friendsContainer.classList.add('friends_container');
                container.appendChild(friendsContainer);

                const title = document.createElement('h1');
                title.textContent = "Discutez avec vos amis !";
                friendsContainer.appendChild(title);

                const friendsList = document.createElement('div');
                friendsList.classList.add('friends_list');

                let nbFriend = 0;
                friends.forEach(friend => {
                    if (nbFriend < 3) {
                        const friendDiv = document.createElement('div');
                        friendDiv.classList.add('friend');
                        friendDiv.dataset.id = friend.user_id;

                        const img = document.createElement('img');
                        img.src = "http://localhost:3000/assets/img/profile_pics/" + friend.profile_pic;
                        img.alt = "profile_pic";
                        friendDiv.appendChild(img);

                        const name = document.createElement('p');
                        name.textContent = friend.username;
                        friendDiv.appendChild(name);

                        friendsList.appendChild(friendDiv);
                        friendsContainer.appendChild(friendsList);
                        nbFriend++;
                        friendDiv.addEventListener('click', function() {
                            createConversation(friend.user_id);
                        });
                    }
                });
            }
        })
}

function loadConversationMessages(conversationId) {
    console.log("Affichage de la conversation : " + conversationId);
}
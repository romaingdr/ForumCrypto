document.addEventListener("DOMContentLoaded", async () => {
    // Récupération des catégories
    try {
        const response = await fetch("http://localhost:3000/api/categories", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const categories = await response.json();
        const selectElement = document.getElementById('topic__category');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id_category;
            option.textContent = category.title;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
    }

    const tagsContainer = document.getElementById('tags-container');
    const tagsInput = document.getElementById('topic__tags');
    const errorMsg = document.getElementById('error__message');

    let tags = [];

    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && tagsInput.value.trim() !== '') {
            if (tags.length >= 3) {
                errorMsg.innerHTML = "Vous ne pouvez ajouter que 3 tags";
                return;
            }

            const tag = tagsInput.value.trim();

            if (!tags.includes(tag)) {
                tags.push(tag);
                renderTags();
            }

            tagsInput.value = '';
            errorMsg.innerHTML = '';
        }
    });

    function renderTags() {
        tagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            const removeIcon = document.createElement('box-icon');
            removeIcon.setAttribute('name', 'x-circle');
            removeIcon.classList.add('remove-icon');
            removeIcon.addEventListener('click', () => {
                removeTag(tag);
            });

            tagElement.appendChild(removeIcon);
            tagsContainer.appendChild(tagElement);
        });
    }

    function removeTag(tagToRemove) {
        tags = tags.filter(tag => tag !== tagToRemove);
        renderTags();
    }

    const topicBtn = document.getElementById("topic__btn");

    topicBtn.addEventListener("click", async () => {
        const errorMsg = document.getElementById("error__message");
        errorMsg.innerHTML = "";

        const title = document.getElementById("topic__title").value;
        const description = document.getElementById("topic__description").value;
        const category = document.getElementById("topic__category").value;
        const status = document.getElementById("topic__status").value;

        if (title.trim() === '' || description.trim() === '' || category.trim() === '' || status.trim() === '') {
            errorMsg.innerHTML = "Tous les champs doivent être remplis";
            return;
        }

        const response2 = await fetch("http://localhost:3000/api/topic", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, category, status }),
        });

        const data = await response2.json();

        if (data.insertId) {
            const idTopic = data.insertId;

            const response3 = await fetch(`http://localhost:3000/api/topic/${idTopic}/tags`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tags: tags }),
            });

            const data3 = await response3.json();

            if (data3.affectedRows) {
                console.log("Tag ajouté avec succès");
            } else {
                errorMsg.innerHTML = "Erreur lors de l'ajout des tags";
            }
        } else {
            errorMsg.innerHTML = "Erreur lors de la création du topic";
        }
    });
});

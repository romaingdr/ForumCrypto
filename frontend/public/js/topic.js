document.addEventListener("DOMContentLoaded", async () => {

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




    const topicBtn = document.getElementById("topic__btn");

    topicBtn.addEventListener("click", async () => {
        const errorMsg = document.getElementById("error__message");
        errorMsg.innerHTML = "";

        const title = document.getElementById("topic__title").value;
        const description = document.getElementById("topic__description").value;
        const category = document.getElementById("topic__category").value;



        const response = await fetch("http://localhost:3000/api/topic", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, category }),
        });

        const data = await response.json();

        if (data.message === "success") {
            window.location.href = "/";
        } else {
            errorMsg.innerHTML = "Erreur lors de la création du topic";
        }
    });
});
export const renderPopularList = (container, shows, onClick) => {
    container.innerHTML = "<h3>Series Destacadas</h3><div class='grid'></div>";
    const grid = container.querySelector(".grid");

    shows.forEach(show => {
        const card = document.createElement("div");
        card.classList.add("popular-card");
        card.innerHTML = `
            <img src="${show.image}" alt="${show.name}">
            <p>${show.name}</p>
        `;
        card.onclick = () => onClick(show.name);
        grid.appendChild(card);
    });
};

export const renderShow = (container, info) => {
    container.innerHTML = `
        <div class="show-card">
            <img src="${info.image}" alt="${info.name}">
            <div class="show-text">
                <h2>${info.name}</h2>
                <div class="summary">${info.summary}</div>
            </div>
        </div>
    `;
};

export const renderHeatmap = (container, seasons) => {
    container.innerHTML = "";
    for (const seasonNum in seasons) {
        const seasonArticle = document.createElement("article");
        seasonArticle.classList.add("season-row");
        seasonArticle.innerHTML = `<header class="season-title">T${seasonNum}</header>`;

        seasons[seasonNum].forEach(ep => {
            const ratingScore = Math.floor(ep.rating);
            const epDiv = document.createElement("div");
            epDiv.className = `episode-box rating-${ratingScore}`;
            epDiv.textContent = ep.number;
            epDiv.title = `Rating: ${ep.rating}`;
            seasonArticle.appendChild(epDiv);
        });
        container.appendChild(seasonArticle);
    }
};
import { fetchShowData, fetchTopShows } from "./modules/tvmaze.js";
import { renderShow, renderHeatmap, renderPopularList } from "./modules/ui.js";

const input = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const backBtn = document.querySelector("#backBtn");
const popularCont = document.querySelector("#popular-shows");
const detailsCont = document.querySelector("#show-details");
const mapCont = document.querySelector("#episodes-map");

const doSearch = async (query) => {
    const searchTerm = query || input.value.trim();
    if (!searchTerm) return;

    popularCont.style.display = "none";
    backBtn.style.display = "block";
    mapCont.innerHTML = "<p>Obteniendo datos de TVMaze...</p>";

    try {
        const { showInfo, episodesBySeason } = await fetchShowData(searchTerm);
        renderShow(detailsCont, showInfo);
        renderHeatmap(mapCont, episodesBySeason);
    } catch (error) {
        mapCont.innerHTML = `<p style="color:#ff4d4d;">Error: ${error.message}</p>`;
    }
};

const goBack = () => {
    popularCont.style.display = "block";
    backBtn.style.display = "none";
    detailsCont.innerHTML = "";
    mapCont.innerHTML = "";
    input.value = "";
};

const init = async () => {
    try {
        const topShows = await fetchTopShows();
        renderPopularList(popularCont, topShows, (name) => {
            input.value = name;
            doSearch(name);
        });
    } catch (err) {
        console.error("Fallo al conectar con la API inicial", err);
    }
};

searchBtn.addEventListener("click", () => doSearch());
backBtn.addEventListener("click", goBack);
input.addEventListener("keypress", (e) => e.key === "Enter" && doSearch());

init();
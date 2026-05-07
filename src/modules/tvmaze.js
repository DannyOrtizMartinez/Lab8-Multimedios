const BASE_URL = "https://api.tvmaze.com";

export const fetchShowData = async (query) => {
    const response = await fetch(`${BASE_URL}/singlesearch/shows?q=${query}&embed=episodes`);
    if (!response.ok) throw new Error("Serie no encontrada");
    const data = await response.json();

    const showInfo = {
        name: data.name,
        image: data.image?.medium || "https://via.placeholder.com/210x295",
        summary: data.summary || "No hay reseña disponible."
    };

    const rawEpisodes = data._embedded.episodes.map(ep => ({
        number: ep.number,
        season: ep.season,
        rating: ep.rating.average || 0
    }));

   
    const episodesBySeason = Object.groupBy(rawEpisodes, (ep) => ep.season);
    return { showInfo, episodesBySeason };
};

export const fetchTopShows = async () => {
    const response = await fetch(`${BASE_URL}/shows?page=0`);
    const data = await response.json();
    return data.slice(0, 12).map(show => ({
        id: show.id,
        name: show.name,
        image: show.image?.medium
    }));
};
export const moviesApiClient = async (api_url) => {
  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error(`Something went wrong!`);
    }
    const data = await response.json();

    const movieData = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        rating: movie.vote_average,
        overview: movie.overview,
        release_date: movie.release_date,
      };
    });
    return movieData;
  } catch (e) {
    console.log(e.message);
  }
};

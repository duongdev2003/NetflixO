import Axios from "./Axios";

// ************* PUBLIC APIs ****************
// Get all the movies functions
export const getAllMoviesService = async (
    category,
    time,
    language,
    rate,
    year,
    search,
    pageNumber
) => {
    const { data } = await Axios.get(
        `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
    );
    return data;
};

// Get random movies Function
export const getRandomMoviesService = async () => {
    const { data } = await Axios.get(`/movies/random/all`);
    return data;
};

// Get movies by id Function
export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data;
};

// Get top rated movie Function
export const getTopRatedMoviesService = async () => {
    const { data } = await Axios.get(`/movies/rated/top`);
    return data;
};

// Review movie Function
export const reviewMovieService = async (token, id, review) => {
    const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// delete movie Function
export const deleteMovieService = async (token, id) => {
    const { data } = await Axios.delete(`/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// delete all movies Functions
export const deleteAllMoviesService = async (token) => {
    const { data } = await Axios.delete(`/movies`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// Create function
export const createMovieService = async (token, movie) => {
    const { data } = await Axios.post(`/movies`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// update movie function
export const updateMovieService = async (token, id, movie) => {
    const { data } = await Axios.put(`/movies/${id}`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

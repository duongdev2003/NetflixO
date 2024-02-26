import Axios from "./Axios";

// ************* PUBLIC APIs *************
// Register new user API call
const registerService = async (user) => {
    const { data } = await Axios.post("/users", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// Logout user Function
const logoutService = () => {
    localStorage.removeItem("userInfo");
    return null;
};

// Login user API call
const loginService = async (user) => {
    const { data } = await Axios.post("/users/login", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// ************* PRIVATE APIs *************
// Update profile API call
const updateProfileService = async (user, token) => {
    const { data } = await Axios.put("/users", user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// Delete profile API call
const deleteProfileService = async (token) => {
    const { data } = await Axios.delete("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (data) {
        localStorage.removeItem("userInfo");
    }
    return data;
};

// Change password API call
const changePasswordService = async (passwords, token) => {
    const { data } = await Axios.put("/users/password", passwords, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// Get all favorite movies
const getFavoriteMovies = async (token) => {
    const { data } = await Axios.get("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// Delete all favorite movies
const deleteFavoriteMovies = async (token) => {
    const { data } = await Axios.delete("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// Like movie API call
const likeMovieService = async (movieId, token) => {
    const { data } = await Axios.post(`/users/favorites`, movieId, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// ************* ADMIN APIs *************
// Admin get all users
const getAllUsersService = async (token) => {
    const { data } = await Axios.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// Admin delete users
const deleteUserService = async (id, token) => {
    const { data } = await Axios.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export {
    registerService,
    logoutService,
    loginService,
    updateProfileService,
    deleteProfileService,
    changePasswordService,
    getFavoriteMovies,
    deleteFavoriteMovies,
    getAllUsersService,
    deleteUserService,
    likeMovieService,
};

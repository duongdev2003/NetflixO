import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as categories from "./Reducers/CategoriesReducer";
import * as movies from "./Reducers/MoviesReducer";

const rootReducer = combineReducers({
    // User reducers
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileReducer,
    userChangePassword: User.userChangePasswordReducer,
    userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
    userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
    adminGetAllUsers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUserReducer,
    userLikeMovie: User.userLikeMovieReducer,

    // Category reducers
    categoryGetAll: categories.getAllCategoriesReducer,
    categoryCreate: categories.createCategoryReducer,
    categoryUpdate: categories.updateCategoryReducer,
    categoryDelete: categories.deleteCategoryReducer,

    // Movies reducers
    getAllMovies: movies.moviesListReducer,
    getRandomMovies: movies.moviesRandomReducer,
    getMovieById: movies.movieDetailsReducer,
    getTopRatedMovie: movies.movieTopRatedReducer,
    createReview: movies.createReviewReducer,
    deleteMovie: movies.deleteMovieReducer,
    deleteAllMovies: movies.deleteAllMoviesReducer,
    createMovie: movies.createMovieReducer,
    casts: movies.CastsReducer,
    updateMovie: movies.updateMovieReducer,
});

// Get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// InitialState
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});

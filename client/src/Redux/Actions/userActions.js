import * as userConstants from "../Constants/userConstants";
import * as moviesConstants from "../Constants/MoviesConstants";
import * as categoriesConstants from "../Constants/CategoriesConstants";
import * as userApi from "../APIs/userServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// Login actions
const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });
        const response = await userApi.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }
};

// Register actions
const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const response = await userApi.registerService(datas);
        dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: response,
        });
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
};

// Logout action
const logoutAction = () => (dispatch) => {
    userApi.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
    dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_RESET });
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
    dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_RESET });
    dispatch({ type: userConstants.GET_ALL_USERS_RESET });
    dispatch({ type: userConstants.DELETE_USER_RESET });
    dispatch({ type: userConstants.LIKE_MOVIE_RESET });

    dispatch({ type: moviesConstants.MOVIE_DETAILS_RESET });
    dispatch({ type: moviesConstants.CREATE_REVIEW_RESET });
    dispatch({ type: moviesConstants.CREATE_MOVIE_RESET });
    dispatch({ type: moviesConstants.RESET_CAST });
    dispatch({ type: moviesConstants.UPDATE_MOVIE_RESET });
    
    dispatch({ type: categoriesConstants.CREATE_CATEGORY_RESET });
    dispatch({ type: categoriesConstants.UPDATE_CATEGORY_RESET });
    dispatch({ type: categoriesConstants.DELETE_CATEGORY_RESET });
};

// Update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userApi.updateProfileService(
            user,
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: response,
        });
        toast.success("Hồ sơ được cập nhật thành công!");
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
};

// Delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
        await userApi.deleteProfileService(tokenProtection(getState));
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
        toast.success("Đã xóa hồ sơ thành công!");
        dispatch(logoutAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
};

// Change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userApi.changePasswordService(
            passwords,
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
};

// Get all favorites actions
const getFavoritesMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
        const response = await userApi.getFavoriteMovies(
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
};

// Delete all favorites movies
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST });
        await userApi.deleteFavoriteMovies(tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS });
        toast.success("Đã xóa thành công mục yêu thích!");
    } catch (error) {
        ErrorsAction(
            error,
            dispatch,
            userConstants.DELETE_FAVORITE_MOVIES_FAIL
        );
    }
};

// Admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
        const response = await userApi.getAllUsersService(
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.GET_ALL_USERS_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
};

// Admin delete users action
const deleteUserAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_USER_REQUEST });
        await userApi.deleteUserService(id, tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_USER_SUCCESS });
        toast.success("Người dùng đã được xóa thành công!");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
    }
};

// user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
        const response = await userApi.likeMovieService(
            movieId,
            tokenProtection(getState)
        );
        dispatch({ type: userConstants.LIKE_MOVIE_SUCCESS, payload: response });
        toast.success("Đã thêm vào mục yêu thích của bạn!");
        dispatch(getFavoritesMoviesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
    }
};

export {
    loginAction,
    registerAction,
    logoutAction,
    updateProfileAction,
    deleteProfileAction,
    changePasswordAction,
    getFavoritesMoviesAction,
    deleteFavoriteMoviesAction,
    getAllUsersAction,
    deleteUserAction,
    likeMovieAction,
};

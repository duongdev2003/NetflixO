import * as categoriesConstants from "../Constants/CategoriesConstants";
import * as categoriesAPIs from "../APIs/CategoriesServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// Get all categories actions
export const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST });
        const data = await categoriesAPIs.getCategoriesService();
        dispatch({
            type: categoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        ErrorsAction(
            error,
            dispatch,
            categoriesConstants.GET_ALL_CATEGORIES_FAIL
        );
    }
};

// Create categories actions
export const createCategoryAction = (title) => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoriesConstants.CREATE_CATEGORY_REQUEST,
        });
        await categoriesAPIs.createCategoryService(
            title,
            tokenProtection(getState)
        );
        dispatch({ type: categoriesConstants.CREATE_CATEGORY_SUCCESS });
        toast.success("Danh mục được tạo thành công!");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error.dispatch, categoriesConstants.CREATE_CATEGORY_FAIL);
    }
};

// Update categories actions
export const updateCategoryAction =
    (id, title) => async (dispatch, getState) => {
        try {
            dispatch({
                type: categoriesConstants.UPDATE_CATEGORY_REQUEST,
            });
            await categoriesAPIs.updateCategoryService(
                id,
                title,
                tokenProtection(getState)
            );
            dispatch({ type: categoriesConstants.UPDATE_CATEGORY_SUCCESS });
            toast.success("Danh mục được cập nhật thành công!");
            dispatch(getAllCategoriesAction());
        } catch (error) {
            ErrorsAction(
                error.dispatch,
                categoriesConstants.UPDATE_CATEGORY_FAIL
            );
        }
    };

// Delete categories actions
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: categoriesConstants.DELETE_CATEGORY_REQUEST });
        await categoriesAPIs.deleteCategoryService(
            id,
            tokenProtection(getState)
        );
        dispatch({ type: categoriesConstants.DELETE_CATEGORY_SUCCESS });
        toast.success("Đã xóa danh mục thành công!");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, categoriesConstants.DELETE_CATEGORY_FAIL);
    }
};

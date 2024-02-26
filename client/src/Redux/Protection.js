import {logoutAction} from "./Actions/userActions";

export const ErrorsAction = (error, dispatch, action) => {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    if (message === "Không được ủy quyền, mã thông báo không thành công") {
        dispatch(logoutAction())
    }
    return dispatch({ type: action, payload: message });
};

// API token protection
export const tokenProtection = (getState) => {
    const {
        userLogin: { userInfo },
    } = getState();
    if (!userInfo?.token) {
        return null;
    } else {
        return userInfo?.token;
    }
};

import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteUserAction,
    getAllUsersAction,
} from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notficaltions/Loader";
import { Empty } from "../../../Components/Notficaltions/Empty";

function Users() {
    const dispatch = useDispatch();

    const { isLoading, isError, users } = useSelector(
        (state) => state.adminGetAllUsers
    );

    // Delete
    const { isError: deleteError, isSuccess } = useSelector(
        (state) => state.adminDeleteUser
    );

    // Delete users handler
    const deleteMoviesHandler = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            dispatch(deleteUserAction(id));
        }
    };

    // useEffect
    useEffect(() => {
        dispatch(getAllUsersAction());
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({
                type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
            });
        }
    }, [dispatch, isError, deleteError, isSuccess]);
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Người Dùng</h2>
                {isLoading ? (
                    <Loader />
                ) : users?.length > 0 ? (
                    <Table2
                        data={users}
                        users={true}
                        onDeleteFunction={deleteMoviesHandler}
                    />
                ) : (
                    <Empty message="Bạn không có người dùng nào" />
                )}
            </div>
        </SideBar>
    );
}

export default Users;

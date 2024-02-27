import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteFavoriteMoviesAction,
    getFavoritesMoviesAction,
} from "../../Redux/Actions/userActions";
import SideBar from "./SideBar";
import Loader from "../../Components/Notficaltions/Loader";
import Table from "../../Components/Table";
import { Empty } from "../../Components/Notficaltions/Empty";
import toast from "react-hot-toast";
import { SidebarContext } from "../../Context/DrawerContext";
import { DownloadVideo } from "../../Context/Functionalities";
import FileSaver from "file-saver";

function FavoritesMovies() {
    const dispatch = useDispatch();
    const { progress, setprogress } = useContext(SidebarContext);
    const { isLoading, isError, likedMovies } = useSelector(
        (state) => state.userGetFavoriteMovies
    );

    // Delete
    const {
        isLoading: deleteLoading,
        isError: deleteError,
        isSuccess,
    } = useSelector((state) => state.userDeleteFavoriteMovies);

    // Delete movies handler
    const deleteMoviesHandler = () => {
        window.confirm(
            "Bạn có chắc chắn muốn xóa tất cả danh sách phim yêu thích không?"
        ) && dispatch(deleteFavoriteMoviesAction());
    };

    // Download movie video
    const DownloadMovieVideo = async (videoUrl, name) => {
        try {
            const data = await DownloadVideo(videoUrl, setprogress);
            setprogress(0);
            FileSaver.saveAs(data, name);
        } catch (error) {
            console.error("Lỗi tải xuống:", error);
        }
    };

    // useEffect
    useEffect(() => {
        dispatch(getFavoritesMoviesAction());
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({
                type: isError
                    ? "GET_FAVORITE_MOVIES_RESET"
                    : "DELETE_FAVORITE_MOVIES_RESET",
            });
        }
    }, [dispatch, isError, deleteError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold">Phim Yêu Thích</h2>
                    {likedMovies?.length > 0 && (
                        <button
                            disabled={deleteLoading}
                            onClick={deleteMoviesHandler}
                            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
                        >
                            {deleteLoading ? "Đang xóa..." : "Xóa tất cả"}
                        </button>
                    )}
                </div>
                {isLoading ? (
                    <Loader />
                ) : likedMovies.length > 0 ? (
                    <Table
                        data={likedMovies}
                        admin={false}
                        downloadVideo={DownloadMovieVideo}
                        progress={progress}
                    />
                ) : (
                    <Empty message="Bạn không có bộ phim yêu thích." />
                )}
            </div>
        </SideBar>
    );
}

export default FavoritesMovies;

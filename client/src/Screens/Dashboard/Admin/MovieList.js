import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
    deleteAllMoviesAction,
    deleteMovieAction,
    getAllMoviesAction,
} from "./../../../Redux/Actions/MoviesActions";
import Loader from "../../../Components/Notficaltions/Loader";
import { Empty } from "../../../Components/Notficaltions/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function MovieList() {
    const dispatch = useDispatch();
    const sameClass =
        "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
    // All movies
    const { isLoading, isError, movies, pages, page } = useSelector(
        (state) => state.getAllMovies
    );
    // Delete
    const { isLoading: deleteLoading, isError: deleteError } = useSelector(
        (state) => state.deleteMovie
    );
    // Delete all movies
    const { isLoading: allLoading, isError: allError } = useSelector(
        (state) => state.deleteAllMovies
    );
    // Delete movie Handler
    const deleteMovieHandler = (id) => {
        window.confirm("Bạn có chắc chắn muốn xóa bộ phim này?") &&
            dispatch(deleteMovieAction(id));
    };
    // Delete all movie Handler
    const deleteAllMoviesHandler = () => {
        window.confirm("Bạn có chắc chắn muốn xóa tất cả phim?") &&
            dispatch(deleteAllMoviesAction());
    };

    useEffect(() => {
        dispatch(getAllMoviesAction({}));
        // Errors
        if (isError || deleteError || allError) {
            toast.error(isError || deleteError || allError);
        }
    }, [dispatch, isError, deleteError, allError]);
    // Pagination next and Prev pages
    const nextPage = () => {
        dispatch(
            getAllMoviesAction({
                pageNumber: page + 1,
            })
        );
    };
    const prevPage = () => {
        dispatch(
            getAllMoviesAction({
                pageNumber: page - 1,
            })
        );
    };

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold">Danh sách phim</h2>
                    {movies?.length > 0 && (
                        <button
                            disabled={allLoading}
                            onClick={deleteAllMoviesHandler}
                            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
                        >
                            {allLoading ? "Đang xóa" : "Xóa tất cả"}
                        </button>
                    )}
                </div>
                {isLoading || deleteLoading ? (
                    <Loader />
                ) : movies.length > 0 ? (
                    <>
                        <Table
                            data={movies}
                            admin={true}
                            onDeleteHandler={deleteMovieHandler}
                        />
                        {/* Loading More */}
                        <div className="w-full flex-rows gap-6 my-5">
                            <button
                                onClick={prevPage}
                                disabled={page === 1}
                                className={sameClass}
                            >
                                <TbPlayerTrackPrev className="text-xl" />
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={page === pages}
                                className={sameClass}
                            >
                                <TbPlayerTrackNext className="text-xl" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Empty message="Bạn không có phim nào." />
                )}
            </div>
        </SideBar>
    );
}

export default MovieList;

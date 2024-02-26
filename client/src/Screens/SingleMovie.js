import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import { BsCollectionFill } from "react-icons/bs";
import Titles from "../Components/Titles";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import Loader from "../Components/Notficaltions/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import FileSaver from "file-saver";

function SingleMovie() {
    const [modalOpen, setModalOpen] = useState(false);
    const { progress, setprogress } = useContext(SidebarContext);
    const { id } = useParams();
    const dispatch = useDispatch();
    const sameClass = "w-full gap-6 flex-colo min-h-screen";
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const { movies } = useSelector((state) => state.getAllMovies);
    // Related movies
    const RelatedMovies = movies?.filter((m) => m.category === movie?.category);
    // Download movie video
    const DownloadMovieVideo = async (videoUrl, name) => {
        await DownloadVideo(videoUrl, setprogress).then((data) => {
            setprogress(0);
            FileSaver.saveAs(data, name);
        });
    };

    useEffect(() => {
        // movie id
        dispatch(getMovieByIdAction(id));
    }, [dispatch, id]);

    return (
        <Layout>
            {isLoading ? (
                <div className={sameClass}>
                    <Loader />
                </div>
            ) : isError ? (
                <div className={sameClass}>
                    <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                        <RiMovie2Line />
                    </div>
                    <p className="text-border text-sm">Đã xảy ra lỗi</p>
                </div>
            ) : (
                <>
                    <ShareMovieModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        movie={movie}
                    />
                    <MovieInfo
                        movie={movie}
                        setModalOpen={setModalOpen}
                        DownloadVideo={DownloadMovieVideo}
                        progress={progress}
                    />
                    <div className="container mx-auto min-h-screen px-2 my-6">
                        <MovieCasts movie={movie} />

                        {/* Rate */}
                        <MovieRates movie={movie} />

                        {/* Related */}
                        {RelatedMovies?.length > 0 && (
                            <div className="my-16">
                                <Titles
                                    title="Có Thể Bạn Quan Tâm"
                                    Icon={BsCollectionFill}
                                />
                                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                                    {RelatedMovies?.map((movie) => (
                                        <Movie key={movie?._id} movie={movie} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
}

export default SingleMovie;

import React from "react";
import { BsCollectionFill } from "react-icons/bs";
import Titles from "../Titles";
import Movie from "../Movie";
import Loader from "./../Notficaltions/Loader";
import { Empty } from "./../Notficaltions/Empty";

function PopularMovies({ isLoading, movies }) {
    return (
        <div className="my-16">
            <Titles title="Phim nổi tiếng" Icon={BsCollectionFill} />
            {isLoading ? (
                <Loader />
            ) : movies?.length > 0 ? (
                <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                    {movies?.slice(0, 8).map((movie, index) => (
                        <Movie key={index} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="mt-6">
                    <Empty message="Có vẻ như chúng ta không có phim nào." />
                </div>
            )}
        </div>
    );
}

export default PopularMovies;

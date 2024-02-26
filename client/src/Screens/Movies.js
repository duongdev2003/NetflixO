import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import toast from "react-hot-toast";
import Loader from "../Components/Notficaltions/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import {
    LanguageData,
    RatesData,
    TimesData,
    YearData,
} from "../Data/FilterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
    const { search } = useParams();
    const dispatch = useDispatch();
    const [category, setCategory] = useState({ title: "Tất cả danh mục" });
    const [year, setYear] = useState(YearData[0]);
    const [times, setTimes] = useState(TimesData[0]);
    const [rates, setRates] = useState(RatesData[0]);
    const [language, setLanguage] = useState(LanguageData[0]);
    const sameClass =
        "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";
    // All movies
    const { isLoading, isError, movies, pages, page } = useSelector(
        (state) => state.getAllMovies
    );
    // All categories
    const { categories } = useSelector((state) => state.categoryGetAll);
    // Queries
    const queries = useMemo(() => {
        const query = {
            category:
                category?.title === "Tất cả danh mục" ? "" : category?.title,
            time: times?.title.replace(/\D/g, ""),
            language:
                language?.title === "Sắp xếp theo ngôn ngữ"
                    ? ""
                    : language?.title,
            rate: rates?.title.replace(/\D/g, ""),
            year: year?.title.replace(/\D/g, ""),
            search: search ? search : "",
        };
        return query;
    }, [category, times, language, rates, year, search]);

    // useEffect
    useEffect(() => {
        //Errors
        if (isError) {
            toast.error(isError);
        }
        // Get all movies
        dispatch(getAllMoviesAction(queries));
    }, [dispatch, isError, queries]);

    // Pagination next and Prev pages
    const nextPage = () => {
        dispatch(
            getAllMoviesAction({
                ...queries,
                pageNumber: page + 1,
            })
        );
    };
    const prevPage = () => {
        dispatch(
            getAllMoviesAction({
                ...queries,
                pageNumber: page - 1,
            })
        );
    };

    const datas = {
        categories: categories,
        category: category,
        setCategory: setCategory,
        language: language,
        setLanguage: setLanguage,
        rates: rates,
        setRates: setRates,
        times: times,
        setTimes: setTimes,
        year: year,
        setYear: setYear,
    };

    return (
        <Layout>
            <div className="min-height-screen container mx-auto px-2 my-6">
                <Filters data={datas} />
                <p className="text-lg font-medium my-6">
                    Tổng có{" "}
                    <span className="font-bold text-subMain">
                        {movies ? movies?.length : 0}
                    </span>{" "}
                    bộ phim {search && `được tìm thấy bằng từ khóa "${search}"`}
                </p>
                {isLoading ? (
                    <div className="w-full gap-6 flex-colo min-h-screen">
                        <Loader />
                    </div>
                ) : movies?.length > 0 ? (
                    <>
                        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                            {movies.map((movie, index) => (
                                <Movie key={index} movie={movie} />
                            ))}
                        </div>

                        {/* Loading More */}
                        <div className="w-full flex-rows gap-6 md:my-20 my-10">
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
                    <div className="w-full gap-6 flex-colo min-h-screen">
                        <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
                            <RiMovie2Line />
                        </div>
                        <p className="text-border text-sm">
                            Có vẻ như chúng ta không có phim nào.
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default MoviesPage;

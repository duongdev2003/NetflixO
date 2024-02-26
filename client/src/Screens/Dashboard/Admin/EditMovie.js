import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploader from "./../../../Components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import {
    getMovieByIdAction,
    removeCastAction,
    updateMovieAction,
} from "../../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import { InlineError } from "./../../../Components/Notficaltions/Error";
import { ImagePreview } from "../../../Components/ImagePreview";
import Loader from "../../../Components/Notficaltions/Loader";
import { RiMovie2Line } from "react-icons/ri";

function EditMovie() {
    const sameClass = "w-full gap-6 flex-colo min-h-screen";
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // Get all categories
    const { categories } = useSelector((state) => state.categoryGetAll);
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const {
        // isLoading: editLoading,
        isError: editError,
        isSuccess,
    } = useSelector((state) => state.updateMovie);
    const { casts } = useSelector((state) => state.casts);
    // Validate movie
    const {
        register,
        handleSubmit,
        // reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(movieValidation),
    });

    // On submit
    const onSubmit = (data) => {
        dispatch(
            updateMovieAction(movie?._id, {
                ...data,
                image: imageWithoutTitle,
                titleImage: imageTitle,
                video: videoUrl,
                casts: casts.length > 0 ? casts : movie?.casts,
            })
        );
    };

    // Delete cast handler
    const deleteCastHandler = (id) => {
        dispatch(removeCastAction(id));
        toast.success("Diễn viên đã được xóa thành công.");
    };

    useEffect(() => {
        if (movie?._id !== id) {
            dispatch(getMovieByIdAction(id));
        } else {
            setValue("name", movie?.name);
            setValue("time", movie?.time);
            setValue("language", movie?.language);
            setValue("year", movie?.year);
            setValue("category", movie?.category);
            setValue("desc", movie?.desc);
            setImageWithoutTitle(movie?.image);
            setImageTitle(movie?.titleImage);
            setVideoUrl(movie?.video);
        }
        // if modal is false then reset cast
        if (modalOpen === false) {
            setCast();
        }
        // if its success then reset form and navigate to addMovie
        if (isSuccess) {
            dispatch({ type: "UPDATE_MOVIE_RESET" });
            navigate(`/edit/${id}`);
        }

        // if error then show error
        if (editError) {
            toast.error("Đã có lỗi xảy ra!");
            dispatch({ type: "UPDATE_MOVIE_RESET" });
        }
    }, [
        dispatch,
        id,
        movie,
        modalOpen,
        setValue,
        isSuccess,
        editError,
        navigate,
    ]);

    return (
        <SideBar>
            <CastsModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                cast={cast}
            />
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <div className={sameClass}>
                    <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                        <RiMovie2Line />
                    </div>
                    <p className="text-border text-sm">Đã có lỗi xảy ra!</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold">Sửa "{movie?.name}"</h2>
                    <div className="w-full grid md:grid-cols-2 gap-6">
                        <div className="w-full">
                            <Input
                                label="Tên phim"
                                placeholder="Game Of Thrones"
                                type="text"
                                bg={true}
                                name="name"
                                register={register("name")}
                            />
                            {errors.name && (
                                <InlineError text={errors.name.message} />
                            )}
                        </div>
                        <div className="w-full">
                            <Input
                                label="Thời gian"
                                placeholder="2Hr"
                                type="number"
                                bg={true}
                                name="time"
                                register={register("time")}
                            />
                            {errors.time && (
                                <InlineError text={errors.time.message} />
                            )}
                        </div>
                    </div>

                    <div className="w-full grid md:grid-cols-2 gap-6">
                        <div className="w-full">
                            <Input
                                label="Ngôn ngữ được sử dụng"
                                placeholder="English"
                                type="text"
                                bg={true}
                                name="language"
                                register={register("language")}
                            />
                            {errors.language && (
                                <InlineError text={errors.language.message} />
                            )}
                        </div>

                        <div className="w-full">
                            <Input
                                label="Năm phát hành"
                                placeholder="2023"
                                type="number"
                                bg={true}
                                name="year"
                                register={register("year")}
                            />
                            {errors.year && (
                                <InlineError text={errors.year.message} />
                            )}
                        </div>
                    </div>
                    {/* Image */}
                    <div className="w-full grid md:grid-cols-2 gap-6">
                        {/* Image Without Title */}
                        <div className="flex flex-col gap-2">
                            <p className="text-border font-semibold text-sm">
                                Hình ảnh không có tiêu đề
                            </p>
                            <Uploader setImageUrl={setImageWithoutTitle} />
                            <ImagePreview
                                image={imageWithoutTitle}
                                name="imageWithoutTitle"
                            />
                        </div>
                        {/* Image with Title */}
                        <div className="flex flex-col gap-2">
                            <p className="text-border font-semibold text-sm">
                                Hình ảnh có tiêu đề
                            </p>
                            <Uploader setImageUrl={setImageTitle} />
                            <ImagePreview
                                image={imageTitle}
                                name="imageTitle"
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <div className="w-full">
                        <Message
                            label="Mô tả phim"
                            placeholder="Make it short and sweet"
                            name="desc"
                            register={{ ...register("desc") }}
                        />
                        {errors.desc && (
                            <InlineError text={errors.desc.message} />
                        )}
                    </div>
                    {/* Category */}
                    <div className="text-sm w-full">
                        <Select
                            label="Thể loại phim"
                            option={categories?.length > 0 ? categories : []}
                            name="category"
                            register={{ ...register("category") }}
                        />
                        {errors.category && (
                            <InlineError text={errors.category.message} />
                        )}
                    </div>
                    {/* Movie Video */}
                    <div className="flex flex-col gap-2 w-full ">
                        <label className="text-border font-semibold text-sm">
                            Movie Video
                        </label>
                        <div
                            className={`w-full grid ${
                                videoUrl && "md:grid-cols-2"
                            } gap-6`}
                        >
                            {videoUrl && (
                                <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                                    Video đã tải lên...
                                </div>
                            )}
                            <Uploader setImageUrl={setVideoUrl} />
                        </div>
                    </div>
                    {/* Cats */}
                    <div className="w-full grid lg:grid-cols-2 gap-6 items-start ">
                        <div className="w-full">
                            <button
                                onClick={() => setModalOpen(true)}
                                className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
                            >
                                Thêm diễn viên
                            </button>
                            <span className="text-border text-xs">
                                Nếu bạn thêm các diễn viên mới thì các diễn viên
                                trước đó sẽ đã xóa. Vì vậy bạn nên thêm chúng
                                một lần nữa.
                            </span>
                        </div>
                        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
                            {casts?.length > 0 &&
                                casts?.map((user) => (
                                    <div
                                        key={user.id}
                                        className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                                    >
                                        <img
                                            src={`${
                                                user.image
                                                    ? user.image
                                                    : "/images/user.png"
                                            }`}
                                            alt={user.name}
                                            className="w-full h-24 object-cover rounded mb-2"
                                        />
                                        <p>{user.name}</p>
                                        <div className="flex-rows mt-2 w-full gap-2">
                                            <button
                                                onClick={() =>
                                                    deleteCastHandler(user?.id)
                                                }
                                                className="w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded"
                                            >
                                                <MdDelete />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCast(user);
                                                    setModalOpen(true);
                                                }}
                                                className="w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded"
                                            >
                                                <FaEdit />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {/* Submit */}
                    <button
                        disabled={isLoading}
                        onClick={handleSubmit(onSubmit)}
                        className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded hover:bg-dry transitions border border-subMain"
                    >
                        {isLoading ? (
                            "Đang cập nhật..."
                        ) : (
                            <>
                                <ImUpload />
                                Cập nhật phim
                            </>
                        )}
                    </button>
                </div>
            )}
        </SideBar>
    );
}

export default EditMovie;

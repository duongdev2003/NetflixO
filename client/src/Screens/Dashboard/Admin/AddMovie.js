import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploader from "./../../../Components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import {
    createMovieAction,
    removeCastAction,
} from "../../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import { InlineError } from "./../../../Components/Notficaltions/Error";
import { ImagePreview } from "../../../Components/ImagePreview";

function AddMovie() {
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get all categories
    const { categories } = useSelector((state) => state.categoryGetAll);
    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.createMovie
    );
    const { casts } = useSelector((state) => state.casts);
    // Validate movie
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(movieValidation),
    });

    // On submit
    const onSubmit = (data) => {
        dispatch(
            createMovieAction({
                ...data,
                image: imageWithoutTitle,
                titleImage: imageTitle,
                video: videoUrl,
                casts,
            })
        );
    };

    // Delete cast handler
    const deleteCastHandler = (id) => {
        dispatch(removeCastAction(id));
        toast.success("Diễn viên đã được xóa thành công.");
    };

    useEffect(() => {
        // if modal is false then reset cast
        if (modalOpen === false) {
            setCast();
        }
        // if its success then reset form and navigate to addMovie
        if (isSuccess) {
            reset({
                name: "",
                time: 0,
                language: "",
                year: 0,
                category: "",
                desc: "",
            });
            setImageTitle("");
            setImageWithoutTitle("");
            setVideoUrl("");
            dispatch({ type: "CREATE_MOVIE_RESET" });
            navigate("/addMovie");
        }
        // if error then show error
        if (isError) {
            toast.error("Đã xảy ra lỗi!");
            dispatch({ type: "CREATE_MOVIE_RESET" });
        }
    }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

    return (
        <SideBar>
            <CastsModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                cast={cast}
            />
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold"> Thêm phim </h2>
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
                            placeholder="2 Giờ"
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
                            placeholder="Tiếng Anh"
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
                        <ImagePreview image={imageTitle} name="imageTitle" />
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
                    {errors.desc && <InlineError text={errors.desc.message} />}
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
                        Video phim
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
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
                    >
                        Thêm diễn viên
                    </button>
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
                        "Please wait..."
                    ) : (
                        <>
                            <ImUpload />
                            Xuất bản phim
                        </>
                    )}
                </button>
            </div>
        </SideBar>
    );
}

export default AddMovie;

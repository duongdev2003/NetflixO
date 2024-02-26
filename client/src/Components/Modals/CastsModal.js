import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import Uploader from "../Uploader";
import { HiPlusCircle } from "react-icons/hi";
import { MdUpdate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    addCastAction,
    updateCastAction,
} from "./../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import { InlineError } from "../Notficaltions/Error";
import { ImagePreview } from "../ImagePreview";

function CastsModal({ modalOpen, setModalOpen, cast }) {
    const dispatch = useDispatch();
    const [castImage, setCastImage] = useState("");
    const generateId = Math.floor(Math.random() * 100000000);
    const image = castImage ? castImage : cast?.image;

    // Validate cast
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required("Cast Name is required"),
            })
        ),
    });

    // On submit
    const onSubmit = (data) => {
        // if cast is not null then update cast
        if (cast) {
            dispatch(
                updateCastAction({
                    ...data,
                    image: image,
                    id: cast.id,
                })
            );
            toast.success("Đã cập nhật diễn viên thành công!");
        } else {
            // else create cast
            dispatch(
                addCastAction({
                    ...data,
                    image: image,
                    id: generateId,
                })
            );
            toast.success("Thêm mới diễn viên thành công!");
        }
        reset();
        setCastImage("");
        setModalOpen(false);
    };

    useEffect(() => {
        if (cast) {
            setValue("name", cast?.name);
        }
    }, [cast, setValue]);

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl opacity-100 scale-100">
                <h2 className="text-3xl font-bold">
                    {cast ? "Cập nhật diễn viên" : "Thêm diễn viên"}
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 text-left mt-6"
                >
                    <div className="w-full">
                        <Input
                            label="Tên diễn viên"
                            placeholder={cast ? cast.fullName : "John Doe"}
                            type="text"
                            name="name"
                            bg={false}
                            register={register("name")}
                        />
                        {errors.name && (
                            <InlineError text={errors.name.message} />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Ảnh diễn viên
                        </p>
                        <Uploader setImageUrl={setCastImage} />
                        <ImagePreview
                            image={image ? image : "/images/user.png"}
                            name="castImage"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={() => setModalOpen(false)}
                        className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
                    >
                        {cast ? (
                            <>
                                <MdUpdate /> Cập nhật
                            </>
                        ) : (
                            <>
                                <HiPlusCircle /> Thêm mới
                            </>
                        )}
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default CastsModal;

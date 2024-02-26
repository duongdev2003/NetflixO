import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notficaltions/Loader";
import { uploadImageService } from "../Redux/APIs/imageUploadService";

function Uploader({ setImageUrl }) {
    const [loading, setLoading] = useState(false);

    // Upload file
    const onDrop = useCallback(
        async (acceptedFiles) => {
            const file = new FormData();
            file.append("file", acceptedFiles[0]);
            console.log(acceptedFiles);
            const data = await uploadImageService(file, setLoading);
            setImageUrl(data);
            console.log(data);
        },
        [setImageUrl]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            multiple: false,
            onDrop,
        });

    return (
        <div className="w-full text-center flex-colo gap-6">
            {loading ? (
                <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md">
                    <Loader />
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
                >
                    <input {...getInputProps()} />
                    <span className="mx-auto flex-colo text-subMain text-3xl">
                        <FiUploadCloud />
                    </span>
                    <p className="text-sm mt-2">
                        Kéo, thả hình ảnh của bạn vào đây
                    </p>
                    <em className="text-xs text-border">
                        {isDragActive
                            ? "Thả ảnh của bản vào đây"
                            : isDragReject
                            ? "Loại tập tin không được hỗ trợ..."
                            : "Chỉ các tệp .jpg và .png mới được chấp nhận"}
                    </em>
                </div>
            )}
        </div>
    );
}

export default Uploader;

import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye, FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

//Rows
const Rows = (movie, i, onDeleteHandler, admin, downloadVideo, progress) => {
    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={movie?.image ? movie?.image : "images/user.png"}
                        alt={movie?.name}
                    />
                </div>
            </td>
            <td className={`${Text} truncate`}>{movie.name}</td>
            <td className={`${Text}`}>{movie.category}</td>
            <td className={`${Text}`}>{movie.language}</td>
            <td className={`${Text}`}>{movie.year}</td>
            <td className={`${Text}`}>{movie.time} Hr</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
                {admin ? (
                    <>
                        <Link
                            to={`/edit/${movie?._id}`}
                            className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
                        >
                            Sửa <FaEdit className="text-green-500" />
                        </Link>
                        <button
                            onClick={() => onDeleteHandler(movie?._id)}
                            className="bg-subMain text-white rounded flex-colo w-6 h-6"
                        >
                            <MdDelete />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() =>
                                downloadVideo(movie?.video, movie?.name)
                            }
                            disabled={progress > 0 && progress < 100}
                            className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
                        >
                            Tải xuống
                            <FaCloudDownloadAlt className="text-green-500" />
                        </button>
                        <Link
                            to={`/movie/${movie?._id}`}
                            className="bg-subMain text-white rounded flex-colo w-6 h-6"
                        >
                            <FaEye />
                        </Link>
                    </>
                )}
            </td>
        </tr>
    );
};

// Table
function Table({ data, admin, onDeleteHandler, downloadVideo, progress }) {
    return (
        <div className="overflow-x-scroll overflow-hidden relative w-full">
            <table className="w-full table-auto border border-border divide-y divide-border">
                <thead>
                    <tr className="bg-dryGray">
                        <th scope="col" className={`${Head}`}>
                            Ảnh
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Tên
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Thể loại
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Ngôn ngữ
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Năm phát hành
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Thời gian
                        </th>
                        <th scope="col" className={`${Head} text-end`}>
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-main divide-y divide-gray-800">
                    {data.map((movie, i) =>
                        Rows(
                            movie,
                            i,
                            onDeleteHandler,
                            admin,
                            downloadVideo,
                            progress
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

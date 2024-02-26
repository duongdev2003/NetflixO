import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/userActions";
import Axios from "../Redux/APIs/Axios";
import { IoMdCloudDownload } from "react-icons/io";

// Check if movie is added to favorites
const IfMovieLiked = (movie) => {
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
    if (movie) {
        return likedMovies?.find(
            (likedMovie) => likedMovie?._id === movie?._id
        );
    }
    return false;
};

// Like movie functionality
const LikeMovie = (movie, dispatch, userInfo) => {
    return !userInfo
        ? toast.error("Vui lòng đăng nhập để thêm phim vào mục yêu thích")
        : dispatch(
              likeMovieAction({
                  movieId: movie?._id,
              })
          );
};

// Download video url
const DownloadVideo = async (videoUrl, setProgress) => {
    console.log(videoUrl);
    const { data } = await Axios({
        url: videoUrl,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
            if (percent > 0 && percent < 100) {
                toast.loading(`Đang tải...${percent}%`, {
                    id: "download",
                    duration: 100000000,
                    position: "bottom-right",
                    style: {
                        background: "#0B0F29",
                        color: "#fff",
                        borderRadius: "10px",
                        border: ".5px solid #F20000",
                        padding: "16px",
                    },
                    icon: (
                        <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />
                    ),
                });
            } else {
                console.log(toast);
                toast.dismiss("download");
            }
        },
    });
    return data;
};

export { IfMovieLiked, LikeMovie, DownloadVideo };

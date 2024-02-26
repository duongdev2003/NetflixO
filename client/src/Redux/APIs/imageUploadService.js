import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageService = async (file, setLoading) => {
    try {
        setLoading(true);
        const { data } = await Axios.post("/upload", file);
        setLoading(false);
        toast.success("Tải tài liệu thành công");
        return data;
    } catch (error) {
        setLoading(false);
        toast.error("Đã xảy ra lỗi khi tải lên");
    }
};

export { uploadImageService };

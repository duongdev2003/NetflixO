import * as yup from "yup";

const ReviewValidation = yup.object().shape({
    comment: yup
        .string()
        .required("Bình luận là bắt buộc")
        .max(150, "Bình luận phải có ít nhất 150 ký tự"),
    rating: yup.number().required("Chọn số sao"),
});

const movieValidation = yup.object().shape({
    name: yup
        .string()
        .required("Vui lòng nhập tên phim")
        .max(50, "Tên phim phải dài ít nhất 50 ký tự"),
    time: yup.number().required("Vui lòng nhập thời lượng phim"),
    language: yup.string().required("Vui lòng nhập ngôn ngữ phim"),
    year: yup.number().required("Vui lòng nhập năm phát hành"),
    category: yup.string().required("Vui lòng chọn thể loại phim"),
    desc: yup
        .string()
        .required("Vui lòng nhập mô tả phim")
        .max(300, "Mô tả phim phải có ít nhất 300 ký tự"),
});

export { ReviewValidation, movieValidation };

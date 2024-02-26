import * as yup from "yup";

// Login validation
const LoginValidation = yup.object().shape({
    email: yup.string().email().required("Email là bắt buộc").trim(),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(20, "Mật khẩu phải ít hơn 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số"),
});

// Register validation
const RegisterValidation = yup.object().shape({
    email: yup.string().email().required("Email là bắt buộc").trim(),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(20, "Mật khẩu phải ít hơn 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số"),
    fullName: yup
        .string()
        .required("Tên hiển thị là bắt buộc")
        .max(20, "Tên đầy đủ phải có tối đa 20 ký tự")
        .matches(/^[a-zA-Z ]*$/, "Tên đầy đủ chỉ được chứa các chữ cái"),
});

const ProfileValidation = yup.object().shape({
    fullName: yup
        .string()
        .required("Tên hiển thị là bắt buộc")
        .max(20, "Tên đầy đủ phải có tối đa 20 ký tự")
        .matches(/^[a-zA-Z ]*$/, "Tên đầy đủ chỉ được chứa các chữ cái"),
    email: yup.string().email().required("Email là bắt buộc").trim(),
});

const PasswordValidation = yup.object().shape({
    oldPassword: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(20, "Mật khẩu phải ít hơn 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số"),
    newPassword: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(20, "Mật khẩu phải ít hơn 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số"),
    confirmPassword: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(20, "Mật khẩu phải ít hơn 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số")
        .oneOf([yup.ref("newPassword"), null], "Mật khẩu phải trùng khớp"),
});

export {
    LoginValidation,
    RegisterValidation,
    ProfileValidation,
    PasswordValidation,
};

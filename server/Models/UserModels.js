import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Vui lòng thêm tên hiển thị!"],
        },
        email: {
            type: String,
            required: [true, "Vui lòng thêm địa chỉ email!"],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Vui lòng thêm mật khẩu!"],
            minlength: [8, "Mật khẩu cần dài ít nhất 8 ký tự!"],
        },
        image: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        likedMovies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movies",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);

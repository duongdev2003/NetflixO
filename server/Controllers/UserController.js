import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

// @desc Register user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExists = await User.findOne({ email });
        // Check if user exists
        if (userExists) {
            res.status(400);
            throw new Error("Người dùng đã tồn tại!");
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in DB
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });
        // If user created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Dữ liệu người dùng không hợp lệ!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Login user
// @route POST /api/users
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user in DB
        const user = await User.findOne({ email });
        // If user exists compare password with hash password then send user data and token to client
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
            // If user not found or password not match send error message
        } else {
            res.status(401);
            throw new Error("Email hoặc mật khẩu không hợp lệ!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// **************** PRIVATE CONTROLLER ****************
// @desc Update user profile
// @route PUT/api/users
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
        // Find user in DB
        const user = await User.findById(req.user._id);
        // If user exists, update user data and save it in DB
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();
            // Send update user data and token to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404);
            throw new Error("Không tìm thấy người dùng!");
        }
        // Else send error message
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete user profile
// @route DELETE/api/users
// @access private
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        // Find user in DB
        const user = await User.findById(req.user._id);
        // If user is admin delete user from DB
        if (user) {
            // If user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Không thể xóa người dùng quản trị!");
            }
            // Else delete user from DB
            await user.deleteOne();
            res.json({ message: "Người dùng đã được xóa thành công!" });
        }
        // Else send error message
        else {
            res.status(404);
            throw new Error("Không tìm thấy người dùng!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Change user password
// @route PUT/api/users/password
// @access private
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        // Find user in DB
        const user = await User.findById(req.user._id);
        // If user exists compare old password with hasded password then update user password and save it in DB
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Mật khẩu đã được thay đổi!" });
        }
        // Else send error message
        else {
            res.status(401);
            throw new Error("Mật khẩu cũ không hợp lệ!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Get all liked movies
// @route PUT/api/users/favorites
// @access private
const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        // Find user in DB
        const user = await User.findById(req.user._id).populate("likedMovies");
        // If user exists send liked movies to client
        if (user) {
            res.json(user.likedMovies);
        }
        //Else send error massage
        else {
            res.status(404);
            throw new Error("Không tìm thấy người dùng!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Add all liked movies
// @route PUT/api/users/favorites
// @access private
const addLikedMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        // Find user in DB
        const user = await User.findById(req.user._id);
        // If user exists add movie to liked movies and save it in client
        if (user) {
            // Check if user already liked
            // If movie already liked send error message
            if (user.likedMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Phim đã tồn tại trong danh sách yêu thích!");
            }
            // Else add movie to liked movies and save it in DB
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies);
        }
        // Else send error message
        else {
            res.status(404);
            throw new Error("Không tìm thấy phim!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete all liked movies
// @route DELETE/api/users/favorites
// @access private
const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        // Find user in DB
        const user = await User.findById(req.user._id);
        // If user exists delete all liked movies and save it in DB
        if (user) {
            user.likedMovies = [];
            await user.save();
            res.json({
                message: "Phim yêu thích của bạn đã được xóa thành công!",
            });
        }
        // Else send error message
        else {
            res.status(404);
            throw new Error("Không tìm thấy người dùng!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************** ADMIN CONTROLLERS ****************
// @desc Get all users
// @route GET/api/users
// @access private
const getUsers = asyncHandler(async (req, res) => {
    try {
        // Find all user in DB
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete users
// @route DELETE/api/users/:id
// @access private/admin
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // Find user in DB
        const user = await User.findById(req.params.id);
        // If user exists delete user from DB
        if (user) {
            // If user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Không thể xóa người dùng quản trị!");
            }
            // Else delete user from DB
            await user.deleteOne();
            res.json({ message: "Người dùng đã xóa thành công!" });
        }
        // Else send error message
        else {
            res.status(404);
            throw new Error({ message: "Không tìm thấy người dùng!" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    getLikedMovies,
    addLikedMovies,
    deleteLikedMovies,
    getUsers,
    deleteUser,
};

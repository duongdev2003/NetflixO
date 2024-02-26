import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";
import asyncHandler from "express-async-handler";

// @desc Authenticated user & get token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

// Protection middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;
    // Check if token exists in header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Set token from Bearer token in header
        try {
            token = req.headers.authorization.split(" ")[1];
            // Veryfy token and get user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user id from decoded token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error(
                "Không được ủy quyền, mã thông báo không thành công"
            );
        }
    }
    // If token does not exist headers send error
    if (!token) {
        res.status(401);
        throw new Error("Không được ủy quyền, không có mã thông báo");
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Không được ủy quyền làm quản trị viên");
    }
};

export { generateToken, protect, admin };

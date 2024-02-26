import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";

//************* PUBLIC CONTROLLER *************
// @desc get all categories
// @router GET/api/categories
// @access public
const getCategories = asyncHandler(async (req, res) => {
    try {
        // Find all categories in database
        const categories = await Categories.find({});
        // Send all categories to the client
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//************* ADMIN CONTROLLER *************
// @desc create new categories
// @router POST/api/categories
// @access private/admin
const createCategory = asyncHandler(async (req, res) => {
    try {
        // Get title from request body
        const { title } = req.body;
        // Create new category

        const category = new Categories({
            title,
        });
        // Save the category in database
        const createdCategory = await category.save();
        // Send the new category to the client
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc update category
// @router PUT/api/categories/:id
// @access private/admin
const updateCategory = asyncHandler(async (req, res) => {
    try {
        // Get category id from request params
        const category = await Categories.findById(req.params.id);

        if (category) {
            // Update category title
            category.title = req.body.title || category.title;
            // Save the updated category in dataabe
            const updatedCategory = await category.save();
            // Send the updated category to the client
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc delete category
// @router DELETE/api/categories/:id
// @access private/admin
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        // Get category id from request params
        const category = await Categories.findById(req.params.id);
        if (category) {
            // Delete the category from database
            await category.deleteOne();
            // Send success message to the client
            res.json({ message: "Đã xóa danh mục" });
        } else {
            res.status(404).json({ message: "Không tim thấy danh muc" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { getCategories, createCategory, updateCategory, deleteCategory };

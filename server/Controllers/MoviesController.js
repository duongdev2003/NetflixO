import { MoviesData } from "../Data/MoviesData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";

// ************ PUBLIC CONTROLLERS ****************
// @desc import movies
// @route POST/api/movies/import
// @access Public

const importMovies = asyncHandler(async (req, res) => {
    // first we make sure our Movies table is empty by delete all documents
    await Movie.deleteMany({});
    // then we insert all movies from MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

// @desc get all movies
// @route GET/api/movies
// @access Public
const getMovies = asyncHandler(async (req, res) => {
    try {
        // Filter movies by category, time, language, rate, year and search
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        };
        // Load more movies functionality
        const page = Number(req.query.pageNumber) || 1; // If page number is not provided in query  we set it to 1
        const limit = 8; // 2 movies per page
        const skip = (page - 1) * limit; // Skip 2 movies per page

        // Find movies by query, skip and limit
        const movies = await Movie.find(query)
            // .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total number of movies
        const count = await Movie.countDocuments(query);

        // Send response with movies and total number of movies
        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit), // Total number of pages
            totalMovies: count, // Total number of movies
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc get all movies
// @route GET/api/movies/:id
// @access Public
const getMovieById = asyncHandler(async (req, res) => {
    try {
        // Find movies by id in database
        const movie = await Movie.findById(req.params.id);
        // If the movie if found send it to the client
        if (movie) {
            res.json(movie);
        }
        // If the movie is not found send 404 error
        else {
            res.status(404);
            throw new Error("Không tìm thấy phim!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc get top rate movies
// @route GET/api/movies/rated/top
// @access Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        // Find top rate movies
        const movies = await Movie.find({}).sort({ rate: -1 });
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc get random movies
// @route GET/api/movies/random/all
// @access Public
const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        // Find random movies
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
        // Send random movies to the client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************** PRIVATE CONTROLLER **************

// @desc Create movies review
// @route POST/api/movies/:id/reviews
// @access Public
const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    try {
        // Find movie by id in database
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            // Check if the user already reviewed this movie
            const alreadyReviewed = movie.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );
            // If the user already reviewed this movie send 400 error
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Bạn đã đánh giá bộ phim này!");
            }
            // Else create a new review
            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image,
                rating: Number(req.body.rating),
                comment,
            };
            // Push the new review to the review <ar></ar>ray
            movie.reviews.push(review);
            // Increment the number of reviews
            movie.numberOfReviews = movie.reviews.length;

            // Calulate the new rate
            movie.rate =
                movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
                movie.reviews.length;

            // Save the movie in database
            await movie.save();
            // Send the new movie to the client
            res.status(201).json({
                message: "Đã thêm đánh giá!",
            });
        } else {
            res.status(404);
            throw new Error("Không tìm thấy phim!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************** ADMIN CONTROLLER **************

// @desc Create movies review
// @route Delete/api/movies/:id
// @access Private/Amdin
const updateMovie = asyncHandler(async (req, res) => {
    try {
        // Get data from request body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;

        // Find movie by id in database
        const movie = await Movie.findById(req.params.id);

        if (movie) {
            // Update movie data
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;

            // Save the movie in database
            const updatedMovie = await movie.save();
            res.status(201).json(updatedMovie);
        } else {
            res.status(404);
            throw new Error("Không tìm thấy phim!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete movie
// @route Delete/api/movies/:id
// @access Private/Amdin
const deleteMovie = asyncHandler(async (req, res) => {
    try {
        // Find movie by id in database
        const movie = await Movie.findById(req.params.id);
        // If the movie is not found delete it
        if (movie) {
            await movie.deleteOne();
            res.json({ message: "Đã xóa phim!" });
        }
        // If the movie is not found send 404 error
        else {
            res.status(404);
            throw new Error("Không tìm thấy phim!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete all movie
// @route POST/api/movies
// @access Private/Amdin
const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
        // Delete all movies
        await Movie.deleteMany({});
        res.json({ message: "Tất cả phim đã bị xóa!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Create movies
// @route POST/api/movies
// @access Private/Amdin
const createMovie = asyncHandler(async (req, res) => {
    try {
        // Get data from request body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;

        // Create a new movie
        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
            userId: req.user._id,
        });
        //Save the movie in database
        if (movie) {
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        } else {
            res.status(404);
            throw new Error("Dữ liệu phim không hợp lệ!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export {
    importMovies,
    getMovies,
    getMovieById,
    getTopRatedMovies,
    getRandomMovies,
    createMovieReview,
    updateMovie,
    deleteMovie,
    deleteAllMovies,
    createMovie,
};

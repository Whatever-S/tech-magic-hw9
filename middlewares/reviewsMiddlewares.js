const books = require("../booksData");

//Middleware for validation existing reviews about certain book
function validateReviewsExist(req, res, next) {
    const book = req.book;

    if (!book.reviews || book.reviews.length === 0) {
        res.status(404).send(`Book with id ${book.id} dosen't have any reviews`);
    } else {
        req.reviews = book.reviews
        next();
    }
}

//Middleware for validation existing review by its id 
function validateReviewByIdExist(req, res, next) {
    const book = req.book
    const reviews =  req.reviews
    const reviewId = req.params.reviewId.slice(1);
    const review = reviews.find((review) => review.id == reviewId);

    if (!review) {
        res.status(404).send(`Book with id ${book.id} dosen't have review with id ${reviewId}`);
    } else {
        req.review = review
        next();
    }
}

//Middleware for validation input data from user about new review on a book
function validateNewReview(req, res, next){
    const { id , comment} = req.body;
    const book = req.book

    const exsistReview = book.reviews.find((review) => review.id == id);

    if (!id){
        res.status(400).send('Id is required');
    }
    if(exsistReview){
        res.status(400).send(`Review with this id ${id} is arleady exsist in current book `);
    }
    if (!comment  || comment.trim() === ''){
        res.status(400).send('Comment is required');
    }
    req.reviewId = id
    req.comment = comment
    next()
}

module.exports = {
    validateReviewsExist,
    validateReviewByIdExist,
    validateNewReview
}
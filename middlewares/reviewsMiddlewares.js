const books = require("../booksData");

function validateReviewsExist(req, res, next) {
    const book = req.book;

    if (!book.reviews || book.reviews.length === 0) {
        res.status(404).send(`Book with id ${book.id} dosen't have any reviews`);
    } else {
        req.reviews = book.reviews
        next();
      }
}

function validateReviewByIdExist(req, res, next) {
    const book = req.book
    const reviews =  req.reviews
    const reviewId = req.params.reviewId.slice(1);
    const review = reviews.find((review) => review.id == reviewId);

    if (!review) {
        res.status(404).send(`Book with id ${book.id} dosen't have review with ${reviewId}`);
    } else {
        req.review = review
        next();
    }
}

function validateNewReview(req, res, next){
    const { id , comment} = req.body;
    if (!id){
        res.status(400).send('Id is required');
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
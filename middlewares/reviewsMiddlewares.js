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
    const { id, comment } = req.body;
    const book = req.book;
  
    const existingReview = book.reviews.find((review) => review.id == id);
    const errors = [];
  
    if (!id) {
      errors.push('Id is required');
    } else if (existingReview) {
      errors.push(`Review with this id ${id} already exists in the current book`);
    }
  
    if (!comment || comment.trim() === '') {
      errors.push('Comment is required');
    }
  
    if (errors.length > 0) {
      res.status(400).send(errors.join('\n'));
    } else {
      req.reviewId = id;
      req.comment = comment;
      next();
    }
}

module.exports = {
    validateReviewsExist,
    validateReviewByIdExist,
    validateNewReview
}
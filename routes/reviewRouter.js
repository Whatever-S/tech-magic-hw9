const books = require("../booksData")
const expess = require("express")
const bookMdwrs = require("../middlewares/bookMiddlewares.js")
const reviewsMdlwrs = require("../middlewares/reviewsMiddlewares")
const {validateBookId } = bookMdwrs
const {validateReviewsExist, validateReviewByIdExist, validateNewReview} = reviewsMdlwrs


const reviewRouter = expess.Router()

reviewRouter.get("/:id/reviews", validateBookId, validateReviewsExist, (req, res) => {
    const book = req.book
    res.send(book.reviews)
});

reviewRouter.get("/:id/reviews/:reviewId",  validateBookId, validateReviewsExist, validateReviewByIdExist, (req, res)=> {
    const review = req.review;
    res.send(review.comment);
})

reviewRouter.delete("/:id/reviews/:reviewId",  validateBookId, validateReviewsExist, validateReviewByIdExist, (req, res)=>{
    const book = req.book;
    const review = req.review;
    const reviewIndex = book.reviews.indexOf(review);
    
    book.reviews.splice(reviewIndex, 1);

    res.send(`Review with id ${review.id} deleted successfully`);
    
})

//Using specific route "/create" for adding new review
reviewRouter.post("/:id/reviews/create", validateBookId, validateNewReview, (req, res) => {
    const book =  req.book
    const comment = req.comment;
    const reviewId = req.reviewId
  
    const newReview = {
      id: reviewId, 
      comment: comment
    };


    book.reviews.push(newReview);

    res.status(201).send(`New review with id ${reviewId} added to current book`);
  });
  

module.exports = reviewRouter
  
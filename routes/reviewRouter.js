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

reviewRouter.post("/:id/reviews/create", validateBookId, validateReviewsExist, validateNewReview, (req, res) => {
    const reviews =  req.reviews
    const comment = req.comment;
    const reviewId = req.reviewId
  
    const newReview = {
      id: reviewId, 
      comment: comment
    };
  
    reviews.push(newReview);
    res.send(`New review with id ${reviewId} added to current book`);
  });
  

module.exports = reviewRouter
  
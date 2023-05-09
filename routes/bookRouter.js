const books = require("../booksData")
const expess = require("express")
const bookExistMdwrs = require("../middlewares/bookMiddlewares.js")
const {validateBookId, validateBookTitle, validateNewBook} = bookExistMdwrs

const bookRouter = expess.Router()

bookRouter.get("/", (req, res)=>{
    res.send(books)
})

bookRouter.get("/:id", validateBookId, (req, res) => {
    const bookId = req.params.id.slice(1);
    
    const book = books.find((book) => book.id == bookId);
    console.log(book)
    res.send(book);
});

bookRouter.put("/:id", validateBookId, validateBookTitle, (req, res) => {
    const bookId = req.params.id.slice(1);
    const book = books.find((book) => book.id == bookId);

    if (book) {
        book.title = req.body.title;
        res.send(`Title of book with id ${book.id} updated: ${book.title}`);
    }
});

bookRouter.post("/", validateNewBook, validateBookTitle, (req, res) => {
    const {id, title, reviews} = req.body
    newBook = {
        "id": id, 
        "title": title, 
        //"reviews": [...reviews]
    }
    books.push(newBook)
    res.send(`New book is succesfully created:
    ${newBook}`)
})

module.exports = bookRouter
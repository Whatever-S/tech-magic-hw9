const books = require("../booksData")
const expess = require("express")
const bookExistMdwrs = require("../middlewares/bookMiddlewares.js")
const {validateBookId, validateBookTitle, validateNewBook} = bookExistMdwrs

const bookRouter = expess.Router()

bookRouter.get("/", (req, res)=>{
    res.send(books)
})

bookRouter.get("/:id", validateBookId, (req, res) => {
    const book = req.book;
    res.send(book);
});

bookRouter.put("/:id", validateBookId, validateBookTitle, (req, res) => {
    const book = req.book;
    book.title = req.title;
    res.send(`Title of book with id ${book.id} updated: ${book.title}`);
});

bookRouter.post("/", validateNewBook, validateBookTitle, (req, res) => {
    const { reviews} = req.body
    const id = req.id
    const title = req.title
    
    newBook = {
        "id": id, 
        "title": title, 
    }
    if (reviews)
        newBook.reviews = reviews

    books.push(newBook)
    res.status(201).send(`New book "${newBook.title}" is succesfully created`)
})

module.exports = bookRouter
const books = require("../booksData");

function validateBookId(req, res, next) {
    const bookId = req.params.id.slice(1);
    const book = books.find((book) => book.id == bookId);
    if (book) {
        req.book = book
        next();
    } else {
        res.status(404).send("Book not found");
    }
}

function validateBookTitle(req, res, next) {
    const { title } = req.body;
    if (!title || title.trim() === '') {
        res.status(400).send('Title is required');
    } else {
        req.title = title
        next();
    }
}

function validateNewBook(req, res, next){
    const { id } = req.body;
    if (!id){
        res.status(400).send('Id is required');
    } else if(books.findIndex(book => book.id === Number(id)) > -1){
        res.status(400).send('Book with such id is already exist');
    } else{
        req.id = id
        next();
    }
}

module.exports = {
    validateBookId,
    validateBookTitle,
    validateNewBook
};


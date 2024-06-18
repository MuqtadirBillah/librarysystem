const { handleResponseWithStatus } = require("../helpers/utils");
const Book = require("../models/book");
const BookAuthor = require("../models/bookAuthor");
const BookCategory = require("../models/bookAuthor")

const createBook = (req, res)=>{
    try{
        let newBook = new Book({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            creation_date: Date.now()
        })
        newBook.save()
        .then(docs=>{
            handleResponseWithStatus(res, 200, true, "success!", { message: "success!", data: docs });
        })
        .catch(err=>{
            if(err.code == 11000){
                handleResponseWithStatus(res, 409, false, "Book with same name already exists!", { error: "Book with same name already exists!", message: "Book with same name already exists!" });
            }
            else{
                handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
            }
        })
    } catch(err){
        console.log(err)
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

const editBook = (req, res)=>{
    try{
        let rq = req.body
        const { _id, email } = res.locals;
        const bookId = req.params.id;
        Object.assign(rq, { updation_date: Date.now() })
    
        Book.findOneAndUpdate({ _id: bookId }, rq, { new: true }, async function (err, docs) {
            if(err){
                handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
            }
            else{
                if(docs==null){
                    handleResponseWithStatus(res, 404, false, "Book not found!", { error: "Book not found!", message: "Book not found!" });
                }
                else{
                    await handleResponseWithStatus(res, 200, true, "Book updated!", { message: "Book updated!", data: docs});
                }
            }
        })
    } catch(err){
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}


const getAllBooks = (req, res)=>{
    try{
        Book.find({ }).populate('author')
        .exec(async (err, docs) => {
            if(err){
                handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
            }
            else{
                if(docs==null){
                    handleResponseWithStatus(res, 404, false, "Book not found!", { error: "Book not found!", message: "Book not found!" });
                }
                else{
                    handleResponseWithStatus(res, 200, true, "success!", { message: "success!", data: docs});
                }
            }
        })
    } catch(err){
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

const getBookById = (req, res)=>{
    try{ 
        Book.find({ _id :req.params.id }).populate('author')
        .exec(async (err, docs) => {
            if(err){
                console.log(err)
                handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
            }
            else{
                if(docs==null){
                    handleResponseWithStatus(res, 404, false, "Book not found!", { error: "Book not found!", message: "Book not found!" });
                }
                else{
                    console.log(docs)
                    await handleResponseWithStatus(res, 200, true, "success!", { message: "success!", data: docs[0]});
                }
            }
        })
    } catch(err){
        console.log(err)
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

const deleteBook = (req, res)=>{
    try{
        let rq = req.body;
        let { id } = req.params
        Book.deleteOne({ _id: id }, (err, data)=>{
            if(err){
                console.log(err)         
                handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });
            }
            else{
                if(data.deletedCount<1){
                    handleResponseWithStatus(res, 404, false, "Book not found!", { error: "Book not found!", message: "Book not found!" });
                }
                else{
                    handleResponseWithStatus(res, 200, true, 'deleted!', { status: "success", message: 'deleted!' });
                }
            }
        })
    } catch(err){
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    editBook,
    deleteBook
}
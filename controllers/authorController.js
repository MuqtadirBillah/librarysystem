const { handleResponseWithStatus } = require("../helpers/utils");
const BookAuthor = require("../models/bookAuthor");

const createBookAuthor = (req, res)=>{
    try{
        console.log(res.locals)
        let newAuthor = new BookAuthor({
            name: req.body.name,
            description: req.body.description,
            creation_date: Date.now()
        })
        newAuthor.save()
        .then(docs=>{
            handleResponseWithStatus(res, 200, true, "success!", { message: "success!", data: docs });
        })
        .catch(err=>{
            console.log(err)
            handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
        })
    } catch(err){
        console.log(err)
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

const editBookAuthor = (req, res)=>{
    try{
        let rq = req.body
        const { _id, email } = res.locals;
        const bookId = req.params.id;
        Object.assign(rq, { updation_date: Date.now() })
    
        BookAuthor.findOneAndUpdate({ id: _id }, rq, { new: true }, async function (err, docs) {
            if(err){
                handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
            }
            else{
                if(docs==null){
                    handleResponseWithStatus(res, 404, false, "Author not found!", { error: "Author not found!", message: "Author not found!" });
                }
                else{
                    await handleResponseWithStatus(res, 200, true, "Author updated!", { message: "Author updated!", data: docs});
                }
            }
        })
    } catch(err){
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

const getAllAuthors = (req, res)=>{
    try{
        BookAuthor.find({}, async function (err, docs) {
            if(err){
                handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
            }
            else{
                if(docs==null){
                    handleResponseWithStatus(res, 404, false, "Author not found!", { error: "Author not found!", message: "Author not found!" });
                }
                else{
                    await handleResponseWithStatus(res, 200, true, "success!", { message: "success!", data: docs});
                }
            }
        })
    } catch(err){
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

const getAuthorById = (req, res)=>{
    try{
        BookAuthor.find({_id: req.params.id}, async function (err, docs) {
            if(err){
                handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
            }
            else{
                if(docs==null){
                    handleResponseWithStatus(res, 404, false, "Author not found!", { error: "Author not found!", message: "Author not found!" });
                }
                else{
                    await handleResponseWithStatus(res, 200, true, "success!", { message: "success!", data: docs[0]});
                }
            }
        })
    } catch(err){
        handleResponseWithStatus(res, 500, false, err, { error: err, message: "Something went wrong!" });
    }
}

const deleteAuthor = (req, res)=>{
    try{
        let rq = req.body;
        let { id } = req.params
        BookAuthor.deleteOne({ _id: id }, (err, data)=>{
            if(err){
                console.log(err)         
                handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });
            }
            else{
                console.log(data)
                if(data.deletedCount<1){
                    handleResponseWithStatus(res, 404, false, "Author not found!", { error: "Author not found!", message: "Author not found!" });
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
    createBookAuthor,
    editBookAuthor,
    deleteAuthor,
    getAllAuthors,
    getAuthorById
}
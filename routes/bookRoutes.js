const express = require("express");
const bookController = require("../controllers/bookController");
const { isAuthenticated } = require("../middlewares");
const bookRouter = express.Router();

bookRouter.route("/").get(isAuthenticated, bookController.getAllBooks);
bookRouter.route("/:id").get(isAuthenticated, bookController.getBookById);
bookRouter.route("/").post(isAuthenticated, bookController.createBook);
bookRouter.route("/edit/:id").post(isAuthenticated, bookController.editBook);
bookRouter.route("/:id").delete(isAuthenticated, bookController.deleteBook);

module.exports = bookRouter;
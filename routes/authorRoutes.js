const express = require("express");
const authorController = require("../controllers/authorController");
const { isAuthenticated } = require("../middlewares");
const authorRouter = express.Router();

authorRouter.route("/").get(isAuthenticated, authorController.getAllAuthors);
authorRouter.route("/:id").get(isAuthenticated, authorController.getAuthorById);
authorRouter.route("/").post(isAuthenticated, authorController.createBookAuthor);
authorRouter.route("/edit/:id").post(isAuthenticated, authorController.editBookAuthor);
authorRouter.route("/:id").delete(isAuthenticated, authorController.deleteAuthor);

module.exports = authorRouter;
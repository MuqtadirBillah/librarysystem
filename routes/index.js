const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);

// book routes
const bookRouter = require("./bookRoutes");
router.use("/book", bookRouter);

// book author routes
const authorRouter = require("./authorRoutes");
router.use("/author", authorRouter);

module.exports = router;
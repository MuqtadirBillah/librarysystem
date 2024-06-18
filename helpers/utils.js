const utils = {
    handleError: (res, errorMsg, obj = {}) => {
        return res.send({
            success: false,
            status: "error",
            message: errorMsg ?? "Not Found!",
            ...obj,
        });
    },
    handleResponseWithStatus: (
        res,
        statusCode,
        success = true,
        errorMsg,
        obj = {}
    ) => {
        res.status(statusCode).json({
            success: success,
            status: "error",
            message: errorMsg ?? "Not Found!",
            ...obj,
        })
    }
};

module.exports = utils;
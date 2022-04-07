"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler(status, message) {
        this.status = status;
        this.message = message;
    }
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
var handleError = function (err, res) {
    if (err instanceof ErrorHandler) {
        var status = err.status, message = err.message;
        return res.status(status).json({ error: message });
    }
    return res.status(400).json(err);
};
exports.handleError = handleError;
//# sourceMappingURL=error.util.js.map
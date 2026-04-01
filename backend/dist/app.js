"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerSpec_js_1 = __importDefault(require("./config/swaggerSpec.js"));
const applyFormRoute_js_1 = __importDefault(require("./routes/applyFormRoute.js"));
const rateLimiter_js_1 = require("./middleware/rateLimiter.js");
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const notFoundHandler_js_1 = require("./middleware/notFoundHandler.js");
const logger_js_1 = require("./middleware/logger.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_js_1.requestLogger);
app.use('/api', rateLimiter_js_1.apiLimiter);
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec_js_1.default, {
    explorer: true,
    customSiteTitle: 'Apply Form API Documentation',
}));
app.use('/api/apply-form', applyFormRoute_js_1.default);
app.use(notFoundHandler_js_1.notFoundHandler);
app.use(errorHandler_js_1.errorHandler);
exports.default = app;

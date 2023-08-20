"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_ACCESS_KEY = exports.ACCESS_KEY = exports.BUCKET_REGION = exports.BUCKET_NAME = exports.FORGOT_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.__prod__ = void 0;
const process_1 = require("process");
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.COOKIE_NAME = "qid";
exports.FORGOT_PASSWORD_PREFIX = 'forget-password:';
exports.BUCKET_NAME = 'listing-image-bucket';
exports.BUCKET_REGION = 'us-east-2';
exports.ACCESS_KEY = process_1.env.access_key;
exports.SECRET_ACCESS_KEY = process_1.env.secret_access_key;
//# sourceMappingURL=constants.js.map
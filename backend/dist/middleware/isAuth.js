"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = void 0;
const isAuth = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error('not authenticated');
    }
    return next();
};
exports.isAuth = isAuth;
const isAdmin = ({ context }, next) => {
    if (context.req.session.userId != 2) {
        throw new Error('not auth, this is not and administrator');
    }
    return next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAuth.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encriptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
const validatePassword = (password, actualPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, actualPassword);
});
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, } = req.body;
    const user = {
        name,
        email,
        password: yield encriptPassword(password)
    };
    const newUser = yield Object.assign(Object.assign({}, user), { id: '1231321321' });
    // Create token valid
    const token = jsonwebtoken_1.default.sign({ _id: newUser.id }, process.env.TOKEN_SECRET || 'TOKENSECRET', {
        expiresIn: 600
    });
    res.send(token);
});
exports.signIn = (req, res) => {
    res.send('SIGN UN');
};
exports.profile = (req, res, next) => {
    res.send().json('HOPLA MUNDO');
    next();
};
//# sourceMappingURL=auth.controlles.js.map
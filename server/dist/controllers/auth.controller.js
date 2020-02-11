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
const user_model_1 = __importDefault(require("../models/user.model"));
const encriptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
const validatePassword = (password, actualPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, actualPassword);
});
const createToken = (id) => jsonwebtoken_1.default.sign({ _id: id }, process.env.TOKEN_SECRET || 'TOKENSECRET', {
    expiresIn: 600
});
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, } = req.body;
    console.log(req.body);
    const user = new user_model_1.default({
        name,
        email,
        password: yield encriptPassword(password),
    });
    const newUser = yield user.save();
    // Create token valid
    const token = createToken(newUser._id);
    res.json({
        token,
        payload: newUser,
    });
});
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        res.status(404).json({
            error: true,
            message: 'EL usuario no existe.'
        });
    }
    const isValid = yield validatePassword(password, user.password);
    if (!isValid) {
        res.status(404).json({
            error: true,
            message: 'La password es invalida.'
        });
    }
    const token = createToken(user._id);
    res.json({
        token: token,
        payload: user
    });
});
//# sourceMappingURL=auth.controller.js.map
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
const user_model_1 = __importDefault(require("../models/user.model"));
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    res.send('El usuario es valido!');
});
exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findById(id);
    res.status(200).json({
        payload: user
    });
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, city, english, skills, portfolio, github, linkedin, experience } = req.body;
    const newProfile = {
        city, english, skills, portfolio, github, linkedin, experience
    };
    const user = yield user_model_1.default.findOneAndUpdate(_id, { name: "pepAe",
        profile: newProfile });
    console.log('NEW USER', user);
    if (!user) {
        res.status(404).json({
            error: true,
            message: 'El usuario no existe'
        });
    }
    res.send({
        body: user,
        message: 'Success'
    });
});
//# sourceMappingURL=user.controller.js.map
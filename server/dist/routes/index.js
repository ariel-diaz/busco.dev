"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const index_controller_1 = require("../controllers/index.controller");
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("./../libs/verifyToken");
router.get('/users', verifyToken_1.TokenValidation, index_controller_1.getUsers);
router.post('/login', index_controller_1.getUser);
router.post('/register', user_controller_1.createUser);
exports.default = router;
//# sourceMappingURL=index.js.map
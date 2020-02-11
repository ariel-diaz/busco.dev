"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/signup', auth_controller_1.signUp);
router.post('/signIn', auth_controller_1.signIn);
exports.default = router;
//# sourceMappingURL=auth.js.map
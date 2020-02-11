"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controller_1 = require("../controllers/user.controller");
router.put('/', user_controller_1.updateUser);
router.get('/:id', user_controller_1.getUser);
exports.default = router;
//# sourceMappingURL=user.js.map
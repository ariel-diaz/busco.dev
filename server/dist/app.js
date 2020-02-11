"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./db"));
const app = express_1.default();
const PORT = 3000;
const db = `mongodb+srv://ariel:ariel123@clusterari-lop9w.mongodb.net/test?retryWrites=true&w=majority`;
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
// Middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/user', user_1.default);
// Connect db
db_1.default(db);
app.listen(PORT, () => {
    console.log(`SERVER RUNNING PORT ${PORT}`);
});
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const payrollRoutes_1 = __importDefault(require("./routes/payrollRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database Connected");
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.log("Database Connection Error:", err));
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/employees", employeeRoutes_1.default);
app.use("/api/payroll", payrollRoutes_1.default);
app.use("/api/employee", employeeRoutes_1.default);

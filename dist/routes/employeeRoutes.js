"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Protected routes: Only accessible by authenticated admins
router.post("/", authMiddleware_1.authMiddleware, employeeController_1.createEmployee);
router.get("/", authMiddleware_1.authMiddleware, employeeController_1.fetchEmployees);
router.get("/:id", authMiddleware_1.authMiddleware, employeeController_1.fetchEmployeeById);
router.put("/:id", authMiddleware_1.authMiddleware, employeeController_1.modifyEmployee);
router.delete("/:id", authMiddleware_1.authMiddleware, employeeController_1.removeEmployee);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/signup", adminController_1.adminSignup);
router.post("/verify", adminController_1.verifyAdminAccount);
router.post("/login", adminController_1.adminLogin);
// Example protected route
router.get("/dashboard", authMiddleware_1.authMiddleware, adminController_1.getAdminDashboard);
exports.default = router;

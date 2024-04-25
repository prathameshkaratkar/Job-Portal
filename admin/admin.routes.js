import express from "express";
const router = express.Router();
import {rateLimit} from "express-rate-limit";

import { createAdmin, getAdmin, getAdminById, updateAdmin, deleteAdmin } from "./admin.controller.js";

const limiter = rateLimit({
    windowMs: 60*1000,
    limit:15,
    message: "Too many requests from this IP, please try again after 1 minute"
})

router.post("/admin", limiter, createAdmin);
router.get("/admin", limiter, getAdmin);
router.get("/admin/:id", limiter, getAdminById);
router.put("/admin/:id", limiter, updateAdmin);
router.delete("/admin/:id", limiter, deleteAdmin);

export default router;

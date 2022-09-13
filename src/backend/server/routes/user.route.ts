import { Router } from "express";
import path from "path";
import controller from "../../controller/controller";
const router = Router();

// get a user
router.get("/user/:name", (req, res) => {
    res.json({
        ...req.params,
        ...req.headers,
        ...req.body,
    })
        .status(200)
        .send();
});

export default router;

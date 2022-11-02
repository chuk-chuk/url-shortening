import express from "express";
import controller from "./controllers/url.controller";

const router = express.Router();

router.get("/urls", controller.getUrls);

export = router;
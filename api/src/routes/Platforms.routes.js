const { Router } = require("express");
const router = Router();
const { getPlatform } = require("../controllers/platforms.controller.js");

router.get("/", getPlatform);



module.exports = router;

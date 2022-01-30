const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.get("/user/:id.json", (req, res) => {
    console.log(req.params, "i am id id id");
    if (!req.params) {
        return res.sendStatus(404);
    }
    db.getPersonInfoById(req.params.id)
        .then((result) => {
            res.json(result.rows[0]);
            console.log(result.rows, " i ma resposne from database");
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

module.exports = router;

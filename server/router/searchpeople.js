const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.get("/newusers.json", (req, res) => {
    db.getLatestUsers()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

router.get("/users.json", (req, res) => {
    const val = req.query;

    db.getUserByQuery(val.q)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

module.exports = router;

const express = require("express");
const db = require("../db.js");
const router = express.Router();
const bycrypt = require("bcryptjs");

router.post("/registration.json", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    // console.log(req.body);
    bycrypt
        .hash(password, 12)
        .then((hash) => {
            return db.addUser(firstname, lastname, email, hash);
        })
        .then((result) => {
            const user = { ...result.rows[0], password: "" };
            req.session.userId = user.id;
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
});

module.exports = router;

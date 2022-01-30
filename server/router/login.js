const express = require("express");
const db = require("../db.js");
const router = express.Router();
const bycrypt = require("bcryptjs");

router.post("/login.json", (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    db.getEmail(email).then((result) => {
        const user = result.rows[0];

        bycrypt
            .compare(password, user.password)
            .then((match) => {
                if (match) {
                    req.session.userId = user.id;
                    return res.sendStatus(200);
                }
            })
            .catch((error) => {
                console.log(error);
                return res.sendStatus(400);
            });
    });
});

module.exports = router;

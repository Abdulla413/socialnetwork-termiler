const multer = require("multer");
const uidsafe = require("uid-safe");
const s3 = require("../s3.js");
const express = require("express");
const db = require("../db.js");
const router = express.Router();
const path = require("path");
const AWS = require("aws-sdk");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/../uploads");
    },
    filename: function (req, file, callback) {
        uidsafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2500000,
    },
});

router.post(
    "/upload/profile/pictur.json",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        const pic_url =
            "https://s3.amazonaws.com/spicedling/" + req.file.filename;
        db.addProfilePic(req.session.userId, pic_url)
            .then((result) => {
                res.json(result.rows[0]);
            })
            .catch((e) => {
                console.log(e);
                res.sendStatus(500);
            });
    }
);

router.get("/upload/profile/pictur/id.json", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(400);
    }
    db.getInfo(userId)  
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(400);
        });
});

router.post("/upload/profile/bio.json", (req, res) => {
    const { bio } = req.body;
    const userId = req.session.userId;
    db.addBio(userId, bio).then((result) => {
        res.json(result.rows[0]);
    });
});

router.post(`/delete-all-profile.json`, s3.deleteAll, (req, res) => {
    db.deleteAllProfile(req.session.userId).then((result) => {
        res.json("deleted successfuly").catch((err) => {
            console.log(err), res.sendStatus(500);
        });
    });
});

module.exports = router;

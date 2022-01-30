const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.post("/friendshipstatus/:id.json", (req, res) => {
    if (!req.params) {
        return res.sendStatus(404);
    }
    db.checkFriendship(req.body.id, req.body.userId)

        .then((result) => {
            if (result.rows.length) {
                const statusOfRequest = {
                    sent: false,
                };
                if (result.rows.length) {
                    statusOfRequest.sent = true;
                    statusOfRequest.sender = result.rows[0].sender_id;
                    statusOfRequest.recipient = result.rows[0].recipient_id;
                    statusOfRequest.accept = result.rows[0].accepted;
                }
                res.json(statusOfRequest);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/send-friend-request/:id.json", (req, res) => {
    if (!req.params.id) {
        res.sendStatus(404);
    }
    console.log(req.body.id, req.body.userId, " iam body");
    db.addFriendRequset(req.body.id, req.body.userId)
        .then((result) => {
            if (result.rows.length) {
                const statusOfRequest = {
                    sent: false,
                };
                if (result.rows.length) {
                    statusOfRequest.sent = true;
                    statusOfRequest.sender = result.rows[0].sender_id;
                    statusOfRequest.recipient = result.rows[0].recipient_id;
                    statusOfRequest.accept = result.rows[0].accepted;
                }
                res.json(statusOfRequest);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/accept-friend-request/:id.json", (req, res) => {
    if (!req.params.id) {
        res.sendStatus(404);
    }
    console.log(req.params.id);
    db.acceptFriendship(req.body.id, req.body.userId)
        .then((result) => {
            console.log(result, " iam result form accept");
            if (result.rows.length) {
                const statusOfRequest = {
                    sent: false,
                };
                if (result.rows.length) {
                    statusOfRequest.sent = true;
                    statusOfRequest.sender = result.rows[0].sender_id;
                    statusOfRequest.recipient = result.rows[0].recipient_id;
                    statusOfRequest.accept = result.rows[0].accepted;
                }
                res.json(statusOfRequest);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/cancel-friend-request/:id.json", (req, res) => {
    if (!req.params.id) {
        res.sendStatus(404);
    }
    console.log(req.params.id);
    db.deleteFriendship(req.body.id, req.body.userId)
        .then((result) => {
            console.log(result, " iam result form cancel");
            if (result.rows.length) {
                const statusOfRequest = {
                    sent: false,
                };
                if (result.rows.length) {
                    statusOfRequest.sent = true;
                    statusOfRequest.sender = result.rows[0].sender_id;
                    statusOfRequest.recipient = result.rows[0].recipient_id;
                    statusOfRequest.accept = result.rows[0].accepted;
                }
                res.json(statusOfRequest);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/delete-friend-request/:id.json", (req, res) => {
    if (!req.params.id) {
        res.sendStatus(404);
    }
    console.log(req.params.id);
    db.deleteFriendship(req.body.id, req.body.userId)
        .then((result) => {
            console.log(result, " iam result form delete");
            if (result.rows.length) {
                const statusOfRequest = {
                    sent: false,
                };
                if (result.rows.length) {
                    statusOfRequest.sent = true;
                    statusOfRequest.sender = result.rows[0].sender_id;
                    statusOfRequest.recipient = result.rows[0].recipient_id;
                    statusOfRequest.accept = result.rows[0].accepted;
                }
                res.json(statusOfRequest);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/reject-friend-request/:id.json", (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(404);
    }
    console.log(req.params.id);
    db.deleteFriendship(req.body.id, req.body.userId)
        .then((result) => {
            console.log(result, " iam result form reject");
            if (result.rows.length) {
                const statusOfRequest = {
                    sent: false,
                };
                if (result.rows.length) {
                    statusOfRequest.sent = true;
                    statusOfRequest.sender = result.rows[0].sender_id;
                    statusOfRequest.recipient = result.rows[0].recipient_id;
                    statusOfRequest.accept = result.rows[0].accepted;
                }
                res.json(statusOfRequest);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get("/friends-wannabes.json", (req, res) => {
    if (!req.session.userId) {
        return res.sendStatus(404);
    }
    console.log(req.params.id);
    db.friendsWannabes(req.session.userId)
        .then((result) => {
            const results = result.rows.map((row) => ({
                ...row,
                password: null,
            }));

            res.json(results);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;

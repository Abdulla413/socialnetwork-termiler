const spicedPg = require("spiced-pg");
const cryptoRandomString = require("crypto-random-string");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:190205:postgres@localhost:5432/socialnetwork"
);

module.exports.addUser = (firstname, lastname, email, password) => {
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstname, lastname, email, password]
    );
};
module.exports.getEmail = (email) => {
    return db.query("SELECT * FROM users WHERE email= $1", [email]);
};

module.exports.addUcodes = (email) => {
    const code = cryptoRandomString({
        length: 6,
    });
    return db.query(
        "INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING *",
        [email, code]
    );
};

module.exports.getInfo = (id) => {
    return db.query("SELECT * FROM users WHERE id = $1;", [id]);
};
module.exports.addProfilePic = (id, pic_url) => {
    return db.query(
        `UPDATE users
     SET pic_url=$2
     WHERE id=$1 RETURNING firstname, lastname, pic_url`,
        [id, pic_url]
    );
};

module.exports.addBio = (id, bio) => {
    return db.query(
        `UPDATE users
     SET bio=$2
     WHERE id=$1 RETURNING *`,
        [id, bio]
    );
};

module.exports.getLatestUsers = () => {
    return db.query(
        `SELECT
        firstname,
        lastname,
        pic_url,
        bio
        FROM
        users
        ORDER BY id DESC
      LIMIT 1`
    );
};

module.exports.getUserByQuery = (val) => {
    return db.query(
        `SELECT
        id,
        firstname,
        lastname,
        pic_url,
        bio
        FROM
        users
        WHERE firstname ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.getPersonInfoById = (id) => {
    return db.query(
        `SELECT
        id,
        firstname,
        lastname,
        pic_url,
        bio
        FROM users WHERE id = $1;`,
        [id]
    );
};

module.exports.checkFriendship = (recipient_id, sender_id) => {
    return db.query(
        `
        SELECT * 
        FROM friendships
        WHERE
        (recipient_id = $1 AND sender_id = $2)
        OR
        (recipient_id = $2 AND sender_id = $1);`,
        [recipient_id, sender_id]
    );
};

module.exports.addFriendRequset = (recipient_id, sender_id) => {
    return db.query(
        "INSERT INTO friendships (recipient_id, sender_id) VALUES ($1, $2) RETURNING *",
        [recipient_id, sender_id]
    );
};

module.exports.acceptFriendship = (recipient_id, sender_id) => {
    return db.query(
        `
        UPDATE friendships
        SET accepted = true
        WHERE (sender_id = $2 AND recipient_id = $1)
        RETURNING *`,
        [sender_id, recipient_id]
    );
};

module.exports.deleteFriendship = (recipient_id, sender_id) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1);`,
        [sender_id, recipient_id]
    );
};

// module.exports.newFriendship = (sender_id, recipient_id) => {
//     return db.query(
//         `
//         INSERT INTO friendships (sender_id, recipient_id)
//         VALUES ($1, $2);`,
//         [sender_id, recipient_id]
//     );
// };

module.exports.friendsWannabes = (id) => {
    return db.query(
        `
        SELECT * FROM friendships JOIN users
            ON (sender_id=users.id AND recipient_id=$1      AND accepted=false) -- WANNABES
            OR (sender_id=users.id AND recipient_id=$1      AND accepted=true)  -- Friend requests, that I accepted
            OR (sender_id=$1      AND recipient_id=users.id AND accepted=true); -- Friend requests, that the other person accepted
            `,
        [id]
    );
};

module.exports.addMessage = (userId, message) => {
    return db.query(
        `INSERT INTO chats 
        (user_id, message) VALUES ($1, $2) RETURNING *
        `,
        [userId, message]
    );
};

module.exports.getLatestMessages = () => {
    return db.query(
        `SELECT
    message,
    chats.created_at
    firstname,
    lastname,
    pic_url
    FROM
    chats
    LEFT JOIN
    users
    ON
    chats.user_id = users.id
    ORDER BY chats.created_at DESC
  LIMIT 10`
    );
};

module.exports.getProForMessage = (userId) => {
    return db.query(
        "SELECT firstname, lastname, pic_url FROM users WHERE id = $1;",
        [userId]
    );
};

module.exports.deleteAllProfile = (userId) => {
    return db.query(
        `DELETE FROM users 
        WHERE id = $1`,
        [userId]
    );
};

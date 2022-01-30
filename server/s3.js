const aws = require("aws-sdk");
const fs = require("fs");
const { unlink } = require("fs/promises");
const db = require("./db.js");

let secrets;
if (process.env.NODE_ENV === "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}
const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = function (req, res, next) {
    const { filename, path, mimetype, size } = req.file;
    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Body: fs.createReadStream(path),
        Key: filename,
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            return unlink(path);
        })
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

module.exports.deleteAll = function (req, res, next) {
    db.getInfo(req.session.userId).then((results) => {
        console.log(results.rows[0], "results.rows");
        const url = results.rows[0].pic_url;
        console.log(url, "url");
    });

    let params = {
        Bucket: "spicedling",
        Key: filename,
    };
    s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else console.log(data); // successful response
        /*
         data = {
         }
         */
    });
};

const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});
module.exports.sendEmail = function sendEmail(to, subject, content) {
    return ses
        .sendEmail({
            Source: "Funky Chicken <alluring.kicker@spicedling.email>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: content,
                    },
                },
                Subject: {
                    Data: "Your Application Has Been Accepted!",
                },
            },
        })
        .promise();
};

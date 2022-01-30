const http = require("http");
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { Server } = require("socket.io");
const server = http.createServer(app);
const db = require("./db.js");

const io = new Server(server);

const routerOfLogin = require("./router/login.js");
const routerOfRegistration = require("./router/registration.js");
const RouterOfNewUsers = require("./router/searchpeople.js");
const routerOfOtherProfile = require("./router/otherprofile.js");
const RouterOfUsersJson = require("./router/searchpeople");
const routerOfFriendshipStatus = require("./router/friendbutton");
const routerOfFriendRequest = require("./router/friendbutton");
const routeOfUploadPicture = require("./router/profile");
const routerOfGetProPic = require("./router/profile");
const routerOfUploadBio = require("./router/profile");
const routerOfFriendsWannabes = require("./router/friendbutton");
const routerOfDeleteAll = require("./router/profile");

const sessionSecret =
    process.env.SESSION_SECRET || require("../secrets").SESSION_SECRET;

app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 15,
    sameSite: true,
});
app.use(cookieSessionMiddleware);

app.use((req, res, next) => {
    console.log(req.method, req.session, req.url);
    next();
});

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    next();
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});
io.on("connection", (socket) => {
    console.log("a user connected");
    const { userId } = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    }

    db.getLatestMessages().then((results) => {
        console.log(results.rows, " 10 message from db");
        socket.emit("chatMessages", results.rows.reverse());
    });

    socket.on("chatMessage", async (message) => {
        console.log("I am a ", message, "from user", userId);

        const result = await db.addMessage(userId, message);

        const profileResult = await db.getProForMessage(userId);
        console.log(profileResult, "ofileResult");
        const currentMessage = { ...result.rows[0], ...profileResult.rows[0] };
        console.log(currentMessage, "currentMessage");

        io.emit("chatMessage", currentMessage);
    });
});

app.use(routerOfFriendRequest);
app.use(routerOfFriendshipStatus);
app.use(routerOfLogin);
app.use(routerOfRegistration);
app.use(RouterOfNewUsers);
app.use(RouterOfUsersJson);
app.use(routerOfOtherProfile);
app.use(routeOfUploadPicture);
app.use(routerOfGetProPic);
app.use(routerOfUploadBio);
app.use(routerOfFriendsWannabes);
app.use(routerOfDeleteAll);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

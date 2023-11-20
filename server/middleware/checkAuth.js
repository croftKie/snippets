const session = require("express-session");
const MongoStore = require("connect-mongo");

exports.addSession = function (req, res, next) {
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: { maxAge: new Date(Date.now() + 36000000) },
    user: "test",
  });
  next();
};

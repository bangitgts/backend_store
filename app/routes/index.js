const userRouter = require("./user.route");

function route(app) {
    app.use("/account", userRouter);
}
module.exports = route;

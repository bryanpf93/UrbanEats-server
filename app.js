// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
const { connectDB } = require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// Each time a request is made, ensure DB is connected
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (e) {
        next(e);
    }
});

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

app.use("/api", require("./routes/index.routes"))
app.use("/auth", require("./routes/auth.routes"))
app.use("/api", require("./routes/restaurant.routes"))
app.use("/api", require("./routes/product.routes"))
app.use("/api", require("./routes/order.routes"))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

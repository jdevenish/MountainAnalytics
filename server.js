const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;


app.use(parser.json());
app.use(cors());

// Default Route
app.get("/", (req, res) => {
    // add redirect at some point
    res.status(200).json({
        "status": 200,
        "msg" : "server is up and running"
    })
});

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const orgRoutes = require("./routes/organization");
app.use("/org", orgRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const domainRoutes = require("./routes/domain");
app.use("/domains", domainRoutes);

const rawDataRoutes = require("./routes/rawdata");
app.use("/data", rawDataRoutes);

// Set the port and configure server to listen on that port
app.set('port', PORT);
app.listen(app.get('port'), () => console.log(`PORT: ${app.get("port")} 🌟`));
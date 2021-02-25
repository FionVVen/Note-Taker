const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const apiRoutes = require("./route/api-route");
const clientRoutes = require("./route/clientside-route")

//set up to receive JSON and string data
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//routes as middleware
app.use("/api", apiRoutes);
app.use(clientRoutes);

// server listening
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
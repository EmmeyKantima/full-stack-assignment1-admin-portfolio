//Import Module
import "dotenv/config";
import express from "express";
import path from "path";
import dns from 'node:dns';
import apiRoutes from "./components/api/router.js";

dns.setServers(['8.8.8.8', '1.1.1.1']); // Uses Google & Cloudflare DNS
const __dirname = import.meta.dirname

//Set up Express app and app PORT number
const app = express();
const port = process.env.PORT || 8888;

//Set up app to use PUG 
app.set("view engine", "pug");

//Set up Public folder as static path
app.use(express.static(path.join (__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

//Routes
import projectRoutes from "./components/projects/router.js";
import technologyRoutes from "./components/technologies/router.js";

app.use("/projects", projectRoutes);
app.use("/technologies", technologyRoutes);


app.get("/", (req, resp) => {
  resp.render("index", { title: "Home" });
});

//Dashboard
app.get("/dashboard", (req, resp) => {
  resp.render("dashboard", { title: "Dashboard" });
});


// Set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
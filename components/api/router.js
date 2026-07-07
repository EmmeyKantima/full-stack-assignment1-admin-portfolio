import express from "express";

const router = express.Router();

// Import database
import projectDB from "../projects/func.js";
import techDB from "../technologies/func.js";

// Return Projects API as Json
router.get("/projects", async (req, res) => {
    let projects = await projectDB.getProjects();

    res.json(projects);

});

// Return Technologies API as Json
router.get("/technologies", async (req, res) => {
    let technologies = await techDB.getTechnologies();

    res.json(technologies);

});

export default router;
import express from "express";

const router = express.Router();

import projectDB from "../projects/func.js";
import techDB from "../technologies/func.js";

// Projects API
router.get("/projects", async (req, res) => {
    let projects = await projectDB.getProjects();

    res.json(projects);

});

// Technologies API
router.get("/technologies", async (req, res) => {
    let technologies = await techDB.getTechnologies();

    res.json(technologies);

});

export default router;
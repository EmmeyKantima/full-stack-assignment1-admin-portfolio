import express from "express";
const router = express.Router();

// Import database
import projectDB from "./func.js";
import technologyDB from "../technologies/func.js";

// Enable form data parsing
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Display all projects
router.get("/", async (req, res) => {
  let projects = await projectDB.getProjects();

  res.render("projects/index", { title: "Projects", projects});
});

// ADD PAGE
router.get("/add", async (req, res) => {

  const technologies = await technologyDB.getTechnologies();

  res.render("projects/add", { title: "Add Project", technologies });
});

// Process ADD submit form
router.post("/add/submit", async (req, res) => {

    let technologies = req.body.technologies;
    if (!Array.isArray(technologies)) {
        technologies = technologies ? [technologies] : [];
    }

    let newProject = {
        title: req.body.title,
        description: req.body.description,
        github: req.body.github,
        demo: req.body.demo,
        technologies: technologies
    };

    await projectDB.addProject(newProject);

    res.redirect("/projects");
});

// EDIT Project page
router.get("/edit", async (req, res) => {

    const project = await projectDB.getProject(req.query.projectId);
    const technologies = await technologyDB.getTechnologies();

    res.render("projects/edit", { title: "Edit Project", project,technologies});
});

// Process EDIT submit form
router.post("/edit/submit", async (req, res) => {

    let technologies = req.body.technologies;

    if (!Array.isArray(technologies)) {
        technologies = technologies ? [technologies] : [];
    }

    let projectId = req.body.projectId;
    let updatedProject = {
        title: req.body.title,
        description: req.body.description,
        github: req.body.github,
        demo: req.body.demo,
        technologies: technologies
    };

    await projectDB.updateProject(projectId, updatedProject);

    res.redirect("/projects");
});

// DELETE Project
router.get("/delete", async (req, res) => {
  await projectDB.deleteProject(req.query.projectId);

  res.redirect("/projects");
});

export default router;
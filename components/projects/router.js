import express from "express";
const router = express.Router();

import projectDB from "./func.js";
import technologyDB from "../technologies/func.js";

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// LIST PAGE
router.get("/", async (req, res) => {
  let projects = await projectDB.getProjects();

  res.render("projects/index", { title: "Projects", projects});
});

// ADD PAGE
router.get("/add", async (req, res) => {

  const technologies = await technologyDB.getTechnologies();

  res.render("projects/add", { title: "Add Project", technologies });
});

// ADD SUBMIT
router.post("/add/submit", async (req, res) => {
  let newProject = {
    title: req.body.title,
    description: req.body.description,
    github: req.body.github,
    demo: req.body.demo,
    technologies: req.body.technologies || []};
  await projectDB.addProject(newProject);
  res.redirect("/projects");
});

//Edit
router.get("/edit", async (req, res) => {

    const project = await projectDB.getProject(req.query.projectId);
    const technologies = await technologyDB.getTechnologies();

    res.render("projects/edit", { title: "Edit Project", project,technologies});
});

//Edit Submit
router.post("/edit/submit", async (req, res) => {

    let projectId = req.body.projectId;
    let updatedProject = {
        title: req.body.title,
        description: req.body.description,
        github: req.body.github,
        demo: req.body.demo,
        technologies: req.body.technologies || []
    };

    await projectDB.updateProject(projectId, updatedProject);

    res.redirect("/projects");
});

// DELETE
router.get("/delete", async (req, res) => {
  await projectDB.deleteProject(req.query.projectId);

  res.redirect("/projects");
});

export default router;
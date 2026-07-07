import express from "express";
const router = express.Router();

import techDB from "./func.js";

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Display all technologies
router.get("/", async (req, res) => {
  let technologies = await techDB.getTechnologies();

  res.render("technologies/index", { title: "Technologies", technologies });
});

// ADD Technology page
router.get("/add", (req, res) => {
  res.render("technologies/add", { title: "Add Technology" });
});

// Process Add SUBMIT Technology form
router.post("/add/submit", async (req, res) => {
  let newTech = { name: req.body.name, category: req.body.category};
  await techDB.addTechnology(newTech);

  res.redirect("/technologies");
});

// Edit Technology page
router.get("/edit", async (req, res) => {

    const technology = await techDB.getTechnology(req.query.technologyId);

    res.render("technologies/edit", { title: "Edit Technology", technology });

});

// Edit Submit Technology form
router.post("/edit/submit", async (req, res) => {

    await techDB.updateTechnology(req.body.technologyId, { name: req.body.name, category: req.body.category });

    res.redirect("/technologies");

});

// DELETE technology
router.get("/delete", async (req, res) => {
  await techDB.deleteTechnology(req.query.technologyId);

  res.redirect("/technologies");
});

export default router;
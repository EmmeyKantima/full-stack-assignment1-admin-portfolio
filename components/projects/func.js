import { MongoClient, ObjectId } from "mongodb";

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI;
const db = new MongoClient(dbUrl).db(process.env.DATABASE_NAME);

// Retrieve projects
async function getProjects() {
  let results = db.collection("projects").find({});
  return await results.toArray();
}

// Insert a new project
async function addProject(project) {
  let result = await db.collection("projects").insertOne(project);

  if (result.insertedId) {
    console.log("Project added");
  }
}

// Retrieve one project by ID
async function getProject(id) {
    return await db.collection("projects").findOne({
        _id: new ObjectId(String(id))
    });
}

// Update a project
async function updateProject(id, data) {
    await db.collection("projects").updateOne({ _id: new ObjectId(String(id)) },{ $set: data });
}

// Delete a project
async function deleteProject(id) {
  let query = { _id: new ObjectId(String(id)) };
  let result = await db.collection("projects").deleteOne(query);

  if (result.deletedCount === 1) {
    console.log("Project deleted");
  }
}

export default {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject
};
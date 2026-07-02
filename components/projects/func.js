import { MongoClient, ObjectId } from "mongodb";

const dbUrl = process.env.MONGODB_URI;
const db = new MongoClient(dbUrl).db(process.env.DATABASE_NAME);

async function getProjects() {
  let results = db.collection("projects").find({});
  return await results.toArray();
}

async function addProject(project) {
  let result = await db.collection("projects").insertOne(project);

  if (result.insertedId) {
    console.log("Project added");
  }
}
async function getProject(id) {
    return await db.collection("projects").findOne({
        _id: new ObjectId(String(id))
    });
}

async function updateProject(id, data) {
    await db.collection("projects").updateOne({ _id: new ObjectId(String(id)) },{ $set: data });
}

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
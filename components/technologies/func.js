import { MongoClient, ObjectId } from "mongodb";

const dbUrl = process.env.MONGODB_URI;
const db = new MongoClient(dbUrl).db(process.env.DATABASE_NAME);

// Retrieve all technologies
async function getTechnologies() {
  let results = db.collection("technologies").find({});
  return await results.toArray();
}

// Retrieve one technology by id
async function getTechnology(id) {
    return await db.collection("technologies").findOne({
        _id: new ObjectId(String(id))
    });
}

// Insert a technology
async function addTechnology(tech) {
  let result = await db.collection("technologies").insertOne(tech);

  if (result.insertedId) {
    console.log("Technology added");
  }
}

// Update a technology
async function updateTechnology(id, data) {
    await db.collection("technologies").updateOne({ _id: new ObjectId(String(id)) }, { $set: data });
}

// Delete a technology
async function deleteTechnology(id) {
  let query = { _id: new ObjectId(String(id)) };
  await db.collection("technologies").deleteOne(query);
}

export default {
  getTechnologies,  
  getTechnology,
  addTechnology,
  updateTechnology,
  deleteTechnology
};
import { MongoClient, ObjectId } from "mongodb";

const dbUrl = process.env.MONGODB_URI;
const db = new MongoClient(dbUrl).db(process.env.DATABASE_NAME);

async function getTechnologies() {
  let results = db.collection("technologies").find({});
  return await results.toArray();
}

async function getTechnology(id) {
    return await db.collection("technologies").findOne({
        _id: new ObjectId(String(id))
    });
}

async function addTechnology(tech) {
  let result = await db.collection("technologies").insertOne(tech);

  if (result.insertedId) {
    console.log("Technology added");
  }
}

async function updateTechnology(id, data) {
    await db.collection("technologies").updateOne({ _id: new ObjectId(String(id)) }, { $set: data });
}

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
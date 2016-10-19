import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
const db = MongoClient.connect(MONGO_URI);

export default db;


// import { MongoClient, ObjectID  } from 'mongodb';
//
// const MONGO_URI = process.env.MONGO_URI;
//
// const db = MongoClient.connect(MONGO_URI);
//
// export default db;
//
// export let ObjectId = ObjectID;



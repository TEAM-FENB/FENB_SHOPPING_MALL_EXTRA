const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async callback => {
  try {
    const client = await mongoClient.connect(process.env.MONGO_DB_URL);
    _db = client.db();

    callback(client);
  } catch (err) {
    console.error(err);
  }
};

const getDB = () => {
  if (_db) return _db;

  throw new Error('No database found!');
};

module.exports = { mongoConnect, getDB };

import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Variable d\'environnement "MONGODB_URI" manquante');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // En développement, utilise une variable globale pour éviter
  // de créer plusieurs connexions avec le Hot Module Replacement

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // En production, crée une nouvelle connexion
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise };

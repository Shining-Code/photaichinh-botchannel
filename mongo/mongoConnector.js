const mongoose = require("mongoose");

class MongoConnector {
  constructor() {
    // Initialize the MongoDB connection
    mongoose.connect(process.env.MONGO_URI, {
      dbName: "fxtin",
      autoIndex: true,
      autoCreate: true,
    });

    // Get the default connection
    this.db = mongoose.connection;

    // Handle connection error
    this.db.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );

    this.db.on("connected", () => {
      console.log("Connected to MongoDB");
    });
  }

  // Example method to close the connection
  closeConnection() {
    this.db.close();
  }
}

module.exports = {
  mongoConnector: new MongoConnector(),
};

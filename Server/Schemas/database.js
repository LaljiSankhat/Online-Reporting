const mongoose = require("mongoose");

exports.connectMongoose = () => {
  mongoose
    .connect("mongodb://localhost:27017/DemoProject")
    .then((e) => console.log("Connected to MongoDB" + e.connection.host))
    .catch((e) => console.log(e));
};

const userSchema = new mongoose.Schema({

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
    // Add any additional validation logic for mobile numbers
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add additional validation logic for email addresses
  },
  password: {
    type: String,
    required: true,
    // Add additional validation logic for passwords (e.g., min length)
  },
  city: {
    type: String,
    default: "city"
  },
  reports: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reports"
    }
  ],
  feedbacks: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedbacks"
    }
  ]
});

exports.User = mongoose.model("User", userSchema);

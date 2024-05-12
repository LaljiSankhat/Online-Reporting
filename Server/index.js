const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { connectMongoose, User } = require("./Schemas/database.js");
const passport = require("passport");
const { initializingPassort } = require("./Utils/passportConfig.js");
const expressSession = require("express-session");
const { Report } = require("./Schemas/reports.js");
const upload = require("./Utils/multer.js");
const bodyParser = require("body-parser");
const { Feedback } = require("./Schemas/feedback.js");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const sendEmail = require("./Utils/Email.js");
const generateEmail = require("./Utils/Email.js");
const otp = require("./Utils/OtpGenerator.js");

connectMongoose();

initializingPassort(passport);

app.use(express.static("public"));

// Increase the limit to allow larger payloads (e.g., 50MB)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "Hellooooo",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sign-up", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });

  if (user) {
    return res.status(400).send({
      userFound: true,
      massage: "user exists",
      newUser: null,
    });
  }

  const newUser = await User.create(req.body);

  res.status(201).send({
    userFound: false,
    massage: "new User Created",
    newUser: newUser,
  });
});

app.post("/post-issue/:mail", upload.single("file"), async (req, res) => {
  const mail = req.params.mail;
  const filter = { email: mail };
  const user = await User.findOne(filter);
  console.log(req.body);
  console.log(req.file);
  const data = {
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    postingDate: req.body.postingDate,
    category: req.body.category,
    city: req.body.city,
    location: req.body.location,
    description: req.body.description,
  };
  if (req.file) {
    data.file = req.file.filename;
  }

  const newReport = await Report.create(data);
  if (newReport) {
    user.reports.push(newReport._id);
    await user.save();
    return res.status(200).send({
      massage: "Report posted Successfully",
      posted: true,
      newReport: newReport,
    });
  } else {
    return res.status(404).send({
      massage: "can't insert try again later",
      posted: false,
      newReport: null,
    });
  }
});

app.post("/post-feedback/:mail", async (req, res) => {
  const mail = req.params.mail;
  const fileter = { email: mail };
  const user = await User.findOne(fileter);
  console.log(req.body);
  const newFeedback = await Feedback.create(req.body);
  if (newFeedback) {
    user.feedbacks.push(newFeedback._id);
    await user.save();
    return res.status(200).send({
      massage: "Feedback posted Successfully",
      posted: true,
      newReport: newFeedback,
    });
  } else {
    return res.status(404).send({
      massage: "can't insert try again later",
      posted: false,
      newReport: null,
    });
  }
});

app.get("/my-complaints/:mail", async (req, res) => {
  const email = req.params.mail;
  const filter = { email: email };
  const complaints = await Report.find(filter);
  if (complaints) {
    res.send({
      found: true,
      result: complaints,
    });
  } else {
    res.send({
      found: false,
      result: null,
    });
  }
});

app.patch("/update-account/:mail", async (req, res) => {
  const email = req.params.mail;
  const filter = { email: email };

  // const user = await userModel.findOneAndUpdate(unique, dataToUpdate, new : true);
  const newEmail = req.body.email;
  console.log(req.body);

  const user = await User.findOneAndUpdate(
    filter,
    {
      email: req.body.email,
      name: req.body.name,
      city: req.body.city,
      number: req.body.number,
    },
    { new: true }
  );

  await user.save();

  const updatedUser = await User.findOne({ email: newEmail });

  if (updatedUser) {
    res.send({
      massage: "User details are updated",
      update: true,
      updatedUser: updatedUser,
    });
  } else {
    res.send({
      massage: "User details are not updated because internal error",
      update: false,
      updatedUser: null,
    });
  }
});

app.get("/all-issues/:city", async (req, res) => {
  const city = req.params.city;
  const filter = { city: city };
  try {
    const complaints = await Report.find(filter);
    if (complaints) {
      res.send({
        massage: "Complaints founded",
        found: true,
        complaints: complaints,
      });
    } else {
      res.send({
        massage: "no complaints were found",
        found: false,
        complaints: null,
      });
    }
  } catch (error) {
    res.send({
      massage: `error occure while finding complaints: ${error}`,
      found: false,
      complaints: null,
    });
  }
});

app.patch("/change-report/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const filter = { _id: new ObjectId(id) };
    // const user = await userModel.findOneAndUpdate(unique, dataToUpdate, new : true);
    const report = await Report.findOneAndUpdate(
      filter,
      { isComplited: true },
      { new: true }
    );

    res.send({
      update: true,
      updatedReport: report,
      massage: "report updated successfully"
    })
  } catch (error) {
    res.send({
      update: false,
      updatedReport: null,
      massage: ` some error occure ${error}`,
    })
  }
});

app.get("/all-feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.send({
      found: true,
      feedbacks: feedbacks,
    });
  } catch (error) {
    res.send({
      found: false,
      feedbacks: null,
      error: `some error ${error}`,
    });
  }
});

app.get("/all-feedbacks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const feedback = await Feedback.findOne(filter);
    res.send({
      found: true,
      feedback: feedback,
      error: false,
    });
  } catch (error) {
    res.send({
      found: false,
      feedback: null,
      error: `error: ${error}`
    });    
  }
});

// app.post("/login", passport.authenticate("local",{
//   successMessage: "true",
//   failureMessage: "false"
// }), async (req, res) => {
//   res.send({
//     logedIn: true
//   })
// });

app.post("/login", async (req, res) => {
  const role = req.body.role;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    role: role,
    email: email,
    password: password,
  });
  if (user) {
    res.status(201).send({
      userFound: true,
      massage: "user founded",
      user: user,
    });
  } else {
    res.status(400).send({
      userFound: false,
      massage: "user not found",
      user: null,
    });
  }
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return res.send({
        massage: "error occure",
        error: true,
      });
    } else {
      return res.send({
        massage: "Logout successfull",
        error: false,
      });
    }
  });
});

app.get("/forgot-password/generate-otp/:mail", async (req, res) => {
  const email = req.params.mail;
  try {
    generateEmail(email, otp);
    res.send({
      otp: otp,
      send: true,
      error: false,
    })
  } catch (error) {
    res.send({
      otp: null,
      error: `some error ${error}`,
      send: false,
    })    
  }
});

app.post("/change-password/:mail", async (req, res) => {
  const email = req.params.mail;
  const filter = {email: email};
  console.log(req.body);
  try {
    const user = await User.findOneAndUpdate(
      filter,
      {password: req.body.password},
      {new: true}
    );    
    res.send({
      update: true,
      updatedUser: user,
      error: false,
    });
  } catch (error) {
    res.send({
      update: false,
      updatedUser: null,
      error: `some error: ${error}`
    })
  }
});


// app.post("/login", async (req, res) => {

// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

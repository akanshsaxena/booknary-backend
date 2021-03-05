const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/User");
const {
  validateNewUser,
  validateLoginUser,
  validateProfileUser,
} = require("../joi_validation/User");
const PAYLOAD_STRING = 'brigfohoufhuhfnouwegfohwef';
dotenv.config();
//Register new user
router.post("/signup", async (req, res) => {
  //Joi validation
  const {
    error
  } = validateNewUser(req.body);
  if (error) {
    console.log(error);
    return res.send({
      message: error.details[0].message
    });
  }

  //If email already exists
  const ifEmailExist = await User.findOne({
    email: req.body.email,
  });
  if (ifEmailExist) {
    console.log("email already exists");
    return res.send({
      message: "Email already registered"
    });
  }

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  //Saving the details to DB
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    // mobNum: req.body.mobNum,
    password: hashedPass,
  });
  try {
    const savedUser = await user.save();
    console.log("Saved user details");
    res.send({
      message: "Success"
    });
  } catch (err) {
    console.log("error in catch");
    res.status(400).send(`error ${err}`);
  }
});

//Login
router.post("/login", async (req, res) => {
  //Joi validation
  const {
    error
  } = validateLoginUser(req.body);
  if (error) return res.send({
    message: "Invalid EmailID/Password"
  });

  //If email exists then get the user details
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.send({
    message: "Invalid EmailID/Password"
  });

  //Check the password if email is present
  const ifPasswordIsCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!ifPasswordIsCorrect)
    return res.send({
      message: "Invalid EmailID/Password"
    });

  //Assign  to header if valid user
  const token = jwt.sign({
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    PAYLOAD_STRING, {
      expiresIn: 60 * 15,
    }
  );
  res.append(
    "message", "Success"
  );
  res.header("auth-token", token).send(token).status(200);
  console.log("logged in");
});

router.get("/get", async (req, res) => {
  //Joi validation
  try {
    const {
      authorId
    } = req.query;
    const getUserData = await User.find({
      _id: authorId,
    });
    res.send(getUserData);
  } catch (err) {
    res.send(err);
  }
});

router.post("/profile", async (req, res) => {
  //Joi validation
  const {
    error
  } = validateProfileUser(req.body);
  if (error) return res.send(`error ${error.details[0].message}`);

  //If email exists then get the user details
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.send(`error EmailNotFound`);
  else {
    const updatedProfile = await User.updateOne({
      email: req.body.email,
    }, {
      mobNum: req.body.mobNum,
      description: req.body.description,
      gender: req.body.gender,
      country: req.body.country,
      age: req.body.age,
    });
    if (updatedProfile.ok) {
      console.log("updated vote");
      res.send(updatedProfile);
    } else {
      console.log("failed");
    }
  }
});

module.exports = router;
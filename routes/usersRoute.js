// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");

// // Register endpoint
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
  
//   try {
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(201).json({ message: "User Registered Successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Login endpoint
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {

//     const user = await User.findOne({email: email, password : password});
//     if (user) {
//       const temp={
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         _id: user._id,
//       }
//       res.json(temp);
//     } else {
//       res.status(400).json({ message: "Login failed" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register endpoint
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };

      res.json(temp);
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

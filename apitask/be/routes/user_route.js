const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")

router.post('/register', async(req, res) => {
    try {
        console.log(req.body)
      const { course, board, name, gender, email, adhar, phone, parentName, dateOfBirth, address } = req.body;
     
    //   check whether fields are empty or not
      if (!course || !board || !name || !gender || !email || !adhar || !phone || !parentName || !dateOfBirth || !address) {
        return res.status(400).json({ error: "Fields Required" });
      }
    

    //   Checking whether the user with email or phone or adhar already exist in DB or  not
      var userExists = await User.findOne({ email: email});
      if (userExists) {
        return res.status(400).json({ error: "User email already exists" });
      }

      var userExists = await User.findOne({ phone: phone});
      if (userExists) {
        return res.status(400).json({ error: "User phone number already exists" });
      }

      var userExists = await User.findOne({ adhar: adhar});
      if (userExists) {
        return res.status(400).json({ error: "User adhar number already exists" });
      }

// If user not  present then save the user into DB
      const user = new User({ course,board,name,gender,email,adhar,phone,parentName,dateOfBirth,address, });
      const userSaved = await user.save();
      if (!userSaved) {
        return res.status(500).json({ error: "An error occurred while saving the user" });
      }
  
      res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
  


module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
var nodemailer = require('nodemailer');

router.post('/register', async (req, res) => {
    try {
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

      // Send email to admin
     

      // const message = {
      //   from:'ajithkumargurram@gmail.com',
      //   to:'azzuzie.g@gmail.com',
      //   subject: "New Applicant Registered",
      //   text: `
      //     A new applicant has been registered.
      //     Here are the details:
      //     Name: ${name}
      //     Email: ${email}
      //     Course: ${course}
      //     Board: ${board}
      //     Gender: ${gender}
      //     Adhar: ${adhar}
      //     Phone: ${phone}
      //     Parent Name: ${parentName}
      //     Date of Birth: ${dateOfBirth}
      //     Address: ${address}
      //   `,
      // };

      var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'ajithkumargurram@gmail.com',
            pass:'cwcaiuhlzslctswh'
        },
        tls : { rejectUnauthorized: false }
    })
    
    var message={
        from:'ajithkumargurram@gmail.com',
        to:'azzuzie.g@gmail.com',
        subject:'Node mailer',
        text:`
            A new applicant has been registered.
            Here are the details:
            Name: ${name}
            Email: ${email}
            Course: ${course}
            Board: ${board}
            Gender: ${gender}
            Adhar: ${adhar}
            Phone: ${phone}
            Parent Name: ${parentName}
            Date of Birth: ${dateOfBirth}
            Address: ${address}
          `
    }
    
    transporter.sendMail(message,(err,info)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log("email sent : "+info.response)
        }
    })

    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

module.exports = router;

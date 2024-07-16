import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

import nodemailer from "nodemailer";
import randomstring from "randomstring";

const sendResetPasswordMail = async(fullName, email, token) => {
	try {
	  const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		requireTLS: true,
		auth: {
		  user: process.env.emailUser,
		  pass: process.env.emailPassword
		}
	  });
	  const mailOptions = {
		from: process.env.emailUser,
		to: email,
		subject: "Reset your password",
		html: `
		  <p>Hello ${fullName},</p>
		  <p>Please use this link to reset your password:</p>
		  <a href="https://secretvox.onrender.com/setpass?token=${token}">RESET PASSWORD</a>
		`
	  };
  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log("Mail has been sent:- ", info.response);
		}
	  })
	} catch (error) {
	  console.log("Error in sendResetPasswordMail auth.controller", error.message);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  }


export const signup = async (req, res) => {
	try {
		const { fullName, username, email, password } = req.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
		});

		//once user is created we will generate tocken and set token to client side.
		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			//saving user in DB
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				email: newUser.email,
				followers: newUser.followers,
				following: newUser.following,
				profileImg: newUser.profileImg,
				coverImg: newUser.coverImg,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
		//destroy the cookie
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

//this will be used for checking is user is authenticated or not authenticated.
export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const forgot = async (req, res) => {
	try {
		const email = req.body.email;
		const userData = await User.findOne({email:email});

		if(userData){
			const randomString = randomstring.generate();
			userData.token = randomString;  // Set the token
			await userData.save();  // Save the token to the user's record
			await User.updateOne({email: email}, {$set:{token: randomString}});
			sendResetPasswordMail(userData.fullName, userData.email, randomString);
			res.status(200).json({error: "Please Check your inbox. Reset Link is sent on "+userData.email+" 😵"});
		}else{
			res.status(200).json({error: "Account for this Email doesn't exist. 😵"});
		}

	} catch (error) {
		console.log("Error in forgot controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

//this expects request like this http://localhost:5000/api/auth/setpass/?token=XZpZQ3LoZ9NFmOBCijTm3olJAUcfXfQD
export const setpass = async (req, res) => {
	try {
	  const token = req.query.token;
	  const tokenData = await User.findOne({ token: token });
  
	  if (tokenData) {
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		await User.findByIdAndUpdate(
		  { _id: tokenData._id },
		  { $set: { password: hashedPassword, token: "" } },
		  { new: true }
		);
		res.status(200).json({ msg: "Password is Updated" });
	  } else {
		res.status(400).json({ error: "Invalid or expired token" });
	  }
	} catch (error) {
	  console.error("Error in setpass controller:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  };
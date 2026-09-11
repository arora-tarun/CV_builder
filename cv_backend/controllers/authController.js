import bcrypt from "bcryptjs"
import { UserModel } from "../modals/userModal.js"
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, contact, password } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await UserModel.create({
      username,
      email,
      contact,
      password: hashedPassword,
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "SUPER_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar || null,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const loginUser = async (req,res) =>{
    try {
        const {identifier, password} = req.body;

        if(!identifier || !password){
            return res.status(400).json({
                success:false,
                message: "Email/Username and Password are required",
            })
        }

        const user = await UserModel.findOne({
            $or:[{email:identifier}, {username:identifier}]
        });

        if (!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email/username or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message: "Invalid emai/usernam or password"
            })
        }

        const token = jwt.sign(
            {id:user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        res.status(200).json({
          success:true,
          message: "Login successful",
          token,
          user:{
            id: user._id,
            username: user.username,
            email:user.email,
            avatar: user.avatar || null,
          }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password"); 
    // .select("-password") removes password from response

    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Return full profile for authenticated user
export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


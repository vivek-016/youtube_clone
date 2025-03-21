import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

const JWT_SECRET = "secret_key"; // Keep this the same across the project


export async function loginUser  (req, res) {
    try {
        const { userName, password } = req.body;

        // finding userName
        const user = await userModel.findOne({ userName });
        // checking if userName exists
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // checking if password is correct by comparing
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });

    }
};
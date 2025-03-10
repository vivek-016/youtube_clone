import userModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";

export async function createUser(req,res){
    try{
        const {userName, email, password, avatar, channel} = req.body;

         // Hash password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
 


        const newUser = new userModel({
            userName: userName,
            email: email,
            password: hashedPassword,
            avatar: avatar,
            channel: channel
        });

        newUser.save().then(data=>{
            if(!data){
                return res.status(400).json({message:"Something went wrong"});
            }

            res.send(data);
        })
    }catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
    
}
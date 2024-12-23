const User = require("../models/user-model")
const bycrypt = require("bcryptjs")


const home = async (req,res) => {
    try{
        res.status(200).json({message:"Welcome home"});
    }
    catch(error){
        console.log("Error in Home Page", error);
        res.status(400).json({message: "Server Error"});
    }
}

const register = async (req,res) => {
    try{

        const {username, email, phone, password} = req.body;

         const userExist = await User.findOne ({email : email})  

         if(userExist){
            return res.status(400).json({message: "Email already exits"});
         }


        // const saltRound = 10;
        // const hash_password = await bycrypt.hash(password,saltRound)

        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({message:"Registration successful", 
            token: await userCreated.generateToken(),
            userId:userCreated._id.toString() 
        });
    }
    catch(error){
        console.log("Error in reg Page", error);
        // res.status(400).json({message: "Server Error"});
        next(error);
    }
}


const login = async (req,res) => {
    try{
        const { email, password} = req.body; 

        const userExist = await User.findOne({email : email})

        if(!userExist){
            return res.status(400).json({message: "Invalid Credentials"});
         }

        const user = await bycrypt.compare(password, userExist.password ) 

        if(user){
            res.status(200).json({
            message:"Login successful", 
            token: await userExist.generateToken(),
            userId:userExist._id.toString(),
            user : userExist
        });
        }

        else{
            res.status(401).json({message: "Invalid email or password"});
        }

    }
    catch{
        console.log("Error in login Page", error);
        // res.status(400).json({message: "Server Error"});
        next(error);
    }
}


const user = async(req,res) => {
     
    try{
         const userData = req.user;
         //console.log(userData);
         return res.status(200).json({userData});
        // res.status(200).json({message:"Hi user"});
    }

    catch(error){
        console.log('User Error', error);
    }
}

module.exports = {home, register, login, user}; 
import { NextFunction, Request, Response } from 'express';
import {User} from '../models/user.models';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const signup= async(req: Request, res:Response)=>{
    try{
        const {name, email, password}= req.body;

        //Validate fields
        if(!(name && email && password)){
            res.status(400).send('All fields are required');
        }

        //Check if user exists
        await User.findOne({email: req.body.email}).then(user=>{
            if(user){
                res.status(400).send('User already exists. Please Login to your account');

            }
            else{
                const user= req.body;
                //Hash password before storing into database
                var salt= bcrypt.genSaltSync(10);
                var hash= bcrypt.hashSync(user.password, salt)
            
                user.password = hash;
                      
                User.create(user).then((user:any)=>{
                    res.json(user)})
                    .catch((err:any)=>{
                    console.log(err)});
                    
                
            }

        });

    }
    catch(err:any){
        res.status(500).send('User Signup Failed');

    }
}

const generateToken = async (user: any, statusCode: number, res: Response) =>{

    const token = await user.jwtGenerateToken();

    const options = {
        expires: new Date(Date.now() + 3600)
    };
    //save token as a cookie
    res
    .status(statusCode)
    .cookie('token', token, options )
    .json({success: true, token})
}

const login= (req: Request, res:Response)=>{

        const {email, password}= req.body;
        //Check if all the fields are filled
        if(!email|| !password){
            res.status(400).send('E-mail and Password are required');
        }

        //Check if user exists in the database
        User.findOne({email: email})
        .then((user: any)=>{
            if(!user){
                res.status(400).send('Inavlid credentials');
            }
            const isMatched= user.comparePassword(password);
            //console.log(isMatched);
            if(isMatched===false){
                
                res.status(400).json({success: false});
            }
            else if(isMatched===true){
                generateToken(user, 200, res);
                
            }
            
            

        })
        .catch((err: any)=>{
            res.json(err);
        })

}

const logout = (req: Request, res: Response, next: NextFunction)=>{
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}

const welcome=(req: Request, res: Response)=>{
    res.status(200).send("Welcome to the home page.")
}

    

export const authController={
    signup, 
    login,
    logout,
    welcome
};



        
            
        
    

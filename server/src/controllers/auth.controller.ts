import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

const encriptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const validatePassword = async (password: string, actualPassword: string): Promise<Boolean>=>  {
   return await bcrypt.compare(password, actualPassword)
}

const createToken = (id: string) : string => jwt.sign({_id: id },
    process.env.TOKEN_SECRET || 'TOKENSECRET', {
        expiresIn: 600
    }
)


export const signUp = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;
        
        const user = new User({
            name,
            email,
            password: await encriptPassword(password),
          }
        )
    
        const newUser = await user.save();
    
        // Create token valid
        const token = createToken(newUser._id);
    
        res.json({
            token,
            payload: newUser,
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message,
        })
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        res.status(404).json({
            error: true,
            message: 'EL usuario no existe.'
        })
    }

    const isValid = await validatePassword(password, user.password)

    if(!isValid) {
        res.status(404).json({
            error: true,
            message: 'La password es invalida.'
        })
    }

    const token = createToken(user._id);

    res.json({
        token: token,
        payload: user
    })

}

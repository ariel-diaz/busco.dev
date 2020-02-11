import { Request, Response } from 'express';
import { IProfile } from '../interfaces/Profile';
import User, { UserType } from '../models/user.model';

 export const createUser = async (req: Request, res: Response) : Promise<any> =>  {
    const { name, email, password} = req.body;
    res.send('El usuario es valido!');
}

export const getUser = async (req: Request, res: Response) : Promise<any> => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({
        payload: user
    })
}

export const updateUser = async (req: Request, res: Response) : Promise<any> =>  {
    const { _id, 
        city, 
        english, 
        skills, 
        portfolio, 
        github,
        linkedin, 
        experience
     } = req.body;

     const newProfile: IProfile = {
        city, english, skills, portfolio, github, linkedin, experience
    }

     const user = await User.findOneAndUpdate(_id, 
        { name: "pepAe",
        profile: newProfile });

    console.log('NEW USER', user)

     if(!user) {
         res.status(404).json({
             error: true,
             message: 'El usuario no existe'
         })
     }



    res.send({
        body: user,
        message: 'Success'
    })
}



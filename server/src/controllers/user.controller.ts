import { Request, Response } from 'express';
import { IProfile } from '../interfaces/Profile';
import User from '../models/user.model';
import { Query } from 'mongoose';

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

     const user = await User.findOneAndUpdate({ _id }, 
        { profile: newProfile });

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

export const deleteUser = async (req: Request, res: Response) => {
    if(!req.params.id) {
        res.status(404).send({
            error: true,
            message: 'El id no es valido'
        })
    }

        const response = await User.findByIdAndDelete(req.params.id);


        res.status(201).send({
            error: false,
            message: 'El usuario se elimino de forma exitosa'
        })
}


export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const {page, ...filters} = req.query;
        const pageSize = 5;
    
        const query = setFilters(filters);
        const users = await User.find(query).skip((page - 1) * pageSize).limit(pageSize);
        
        res.status(200).send({
            length: users.length,
            payload: users,
        });
    } catch (error) {
        res.status(500).send({
            error,
        })
    }
}


const setFilters = (filter: IProfile) => {
    let query: any = {};

    if(filter?.experience !== undefined) {
        query["profile.experience"] = filter.experience
    }

    if(filter?.city) {
        query["profile.city"] = filter.city
    }

    if(filter?.english) {
        query["profile.english"] = filter.english
    }

    if(filter?.skills && filter.skills.length > 0) {
        query["profile.skills"] = {$all: filter.skills}
    }

    if(filter?.portfolio) {
        query["profile.portolio"] = { $nin: [ null, "" ] }
    }

    if(filter?.github) {
        query["profile.github"] = { $nin: [ null, "" ] }
    }

    if(filter?.linkedin) {
        query["profile.linkedin"] = { $nin: [ null, "" ] }
    }

    return query;

} 



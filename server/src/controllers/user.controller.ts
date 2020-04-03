import { Request, Response } from 'express';
import { IProfile } from '../interfaces/Profile';
import User from '../models/user.model';
import Profile from '../models/profile.model';

export const getUser = async (req: Request, res: Response) : Promise<any> => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({
        payload: user
    })
}

export const updateUser = async (req: Request, res: Response) : Promise<any> =>  {
  try {
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

    const profile = await Profile.create(newProfile);

    console.log('nuevo profile', profile)

    if(!profile) throw new Error('Error al crear el perfil');

     const user = await User.findOneAndUpdate({ _id }, 
        { profile: profile._id });

    console.log('Nuevo user', user);

     if(!user) throw new Error('El usuario no existe')

    res.status(201).send({
        body: user,
        message: 'Success'
    })
  } catch (error) {
    res.status(404).json({
        error: true,
        message: error.message
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        console.log('ID DELETE', req.params.id)
        if(!req.params.id) {
            res.status(404).send({
                error: true,
                message: 'El id no es valido'
            })
        }
    
            const response = await User.findByIdAndDelete(req.params.id);

            if(!response) throw new Error('No se encontro el ID')
    
            res.status(201).send({
                error: false,
                message: 'El usuario se elimino de forma exitosa'
            })
    } catch (error) {
        res.status(404).send({
            error: true,
            message: error.message,
        })
    }
}


export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const {page, ...filters} = req.query;
        const pageSize = 5;
    
        const query = setFilters(filters);
        const users = await User.find(query).skip((page - 1) * pageSize).limit(pageSize).populate('profile');
        
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



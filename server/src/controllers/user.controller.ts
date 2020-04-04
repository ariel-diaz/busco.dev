import { Request, Response } from 'express';
import { IProfile } from '../interfaces/Profile';
import userModel from '../models/user.model';
import profileModel from '../models/profile.model';

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  res.status(200).json({
    payload: user,
  });
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      _id,
      city,
      english,
      skills,
      portfolio,
      github,
      linkedin,
      experience,
    } = req.body;

    const newProfile: IProfile = {
      city,
      english,
      skills,
      portfolio,
      github,
      linkedin,
      experience,
    };

    const user = await userModel.findById(_id);
    if (!user) throw new Error('El usuario no existe');

    const newP = user.profile
    ? await profileModel.findOneAndUpdate({ _id: user.profile }, { ...newProfile })
    : await profileModel.create(newProfile);

    if (!newP) throw new Error('Error al crear el perfil');

    const newUser = await userModel.findOneAndUpdate(
      { _id },
      { profile: newP._id },
    );

    const userWithProfile = await userModel.findById(_id).populate('profile');

    res.status(200).send({
      payload: userWithProfile,
      message: 'Success',
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      message: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(404).send({
        error: true,
        message: 'El id no es valido',
      });
    }

    const response = await userModel.findByIdAndDelete(req.params.id);

    if (!response) throw new Error('No se encontro el ID');

    res.status(201).send({
      error: false,
      message: 'El usuario se elimino de forma exitosa',
    });
  } catch (error) {
    res.status(404).send({
      error: true,
      message: error.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page, ...filters } = req.query;
    const pageSize = 5;

    const query = setFilters(filters);
    const users = await userModel
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('profile');

    res.status(200).send({
      length: users.length,
      payload: users,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

const setFilters = (filter: IProfile) => {
  const query: any = {};

  if (filter?.experience !== undefined) {
    query['profile.experience'] = filter.experience;
  }

  if (filter?.city) {
    query['profile.city'] = filter.city;
  }

  if (filter?.english) {
    query['profile.english'] = filter.english;
  }

  if (filter?.skills && filter.skills.length > 0) {
    query['profile.skills'] = { $all: filter.skills };
  }

  if (filter?.portfolio) {
    query['profile.portolio'] = { $nin: [null, ''] };
  }

  if (filter?.github) {
    query['profile.github'] = { $nin: [null, ''] };
  }

  if (filter?.linkedin) {
    query['profile.linkedin'] = { $nin: [null, ''] };
  }

  return query;
};

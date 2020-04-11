import { Request, Response } from 'express';
import userModel from '../models/user.model';

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  res.status(200).json({
    payload: user,
  });
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { _id } = req.body;

    const user = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) throw new Error('El usuario no existe');

    res.status(200).send({
      payload: user,
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

const setFilters = (filter: any) => {
  const query: any = {};

  if (filter?.experience !== undefined) {
    query.experience = filter.experience;
  }

  if (filter?.city) {
    query.city = filter.city;
  }

  if (filter?.english) {
    query.english = filter.english;
  }

  if (filter?.skills && filter.skills.length > 0) {
    query.skills = { $all: filter.skills.split(',') };
  }

  if (filter?.portfolio) {
    query.portfolio = { $nin: [null, ''] };
  }

  if (filter?.github) {
    query.github = { $nin: [null, ''] };
  }

  if (filter?.linkedin) {
    query.linkedin = { $nin: [null, ''] };
  }

  return query;
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page = 1, ...filters } = req.query;
    const pageSize = 2;

    const query = setFilters(filters);

    await userModel
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select('-password -refreshToken -access_token_github')
      .exec((err, users) => {
        if (err) {
          throw new Error('');
        }
        userModel.countDocuments(query).exec((countError: Error, count) => {
          if (err) {
            throw new Error(countError.message);
          }

          res.status(200).send({
            pageSize,
            payload: users,
            total: count,
            page: +page,
          });
        });
      });
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      error,
    });
  }
};

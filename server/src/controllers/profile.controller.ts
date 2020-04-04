import { Request, Response } from 'express';
import cities from '../mock/argentina';
import skills from '../mock/skills';

export const getCities = (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      payload: cities,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

export const getSkills = (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      payload: skills,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
}

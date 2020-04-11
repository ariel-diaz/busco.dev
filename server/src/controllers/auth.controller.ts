import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

const encriptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const validatePassword = async (
  password: string,
  actualPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, actualPassword);
};

const createToken = (id: string): string =>
  jwt.sign({ _id: id }, process.env.TOKEN_SECRET || 'TOKENSECRET', {
    expiresIn: 600,
  });

const createRefreshToken = (id: string): string =>
  jwt.sign({ _id: id }, process.env.REFRESH_TOKEN_SECRET || 'TOKENSECRET', {
    expiresIn: 86400,
  });

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    const payload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET || '');
    const user = await User.findOne({ refreshToken: refresh_token });

    if (!user || !payload) throw new Error('Refresh token invalido');

    const newToken = createToken(user._id);
    const newRefreshToken = createRefreshToken(user._id);

    res.status(201).send({
      access_token: newToken,
      refresh_token: newRefreshToken,
    });

  } catch (error) {
    res.status(400).send({
      error,
      success: true,
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password: await encriptPassword(password),
    });

    const newUser = await user.save();

    // Create token valid
    const token = createToken(newUser._id);
    const refresh = createRefreshToken(newUser._id);

    await User.findByIdAndUpdate(newUser._id, { refreshToken: refresh });

    res.json({
      token,
      refreshToken: refresh,
      payload: newUser,
    });
  } catch (error) {
    res.status(400).send({
      error: true,
      message: error.message,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password, access_token } = req.body;

    const user = (access_token && !email)
    ? await User.findOne({ access_token_github: access_token }).select('-access_token_github -password')
    : await User.findOne({ email }).select('-access_token_github -password');

    if (!user) {
      res.status(404).json({
        error: true,
        message: 'EL usuario no existe.',
      });
    }

    let isValid = true;
    if (!access_token && password && email) {
      isValid = await validatePassword(password, user.password);
    }

    if (!isValid) {
      res.status(400).json({
        error: true,
        message: 'La password es invalida.',
      });
    }

    const token = createToken(user._id);
    const refresh = createRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id,  { refreshToken: refresh });

    res.json({
      token,
      refreshToken: refresh,
      payload: user,
    });
  } catch (error) {
    console.log('error', error);
    res.status(400).json({
      error: true,
      message: 'La password es invalida.',
    });
  }
};

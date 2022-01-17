import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import { controllerFunction } from './functions';
import User from '../models/user';

const logUserIn: controllerFunction = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    console.log(user);

    if (!user) {
      res.status(401);
      res.send(`Could not find user with name [${name}].`);
    } else {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const { _id } = user;
        const expiresIn = '1d';

        const payload = {
          sub: _id,
          iat: Date.now(),
        };

        const PRIV_KEY = fs.readFileSync(`${__dirname}/../../jwt_RS256_key_pub.pem`, 'utf8');
        const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

        const userToSend = {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
        };

        res.send({
          success: true,
          token: `Bearer ${signedToken}`,
          expires: expiresIn,
          user: userToSend,
        });
      }

      res.status(401);
      res.send('You entered the wrong password');
    }
  } catch (e) {
    console.log(e);
  }
};

export default logUserIn;

import { Router } from 'express';

import {
  createClass,
  getAllClasses,
  getClassById,
} from '../controllers/classController';

const classes = Router();

classes.post('/', createClass);
classes.get('/', getAllClasses);
classes.get('/:id', getClassById);

export default classes;

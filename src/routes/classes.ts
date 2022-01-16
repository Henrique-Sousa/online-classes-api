import { Router } from 'express';

import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from '../controllers/classController';

const classes = Router();

classes.post('/', createClass);
classes.get('/', getAllClasses);
classes.get('/:id', getClassById);
classes.put('/:id', updateClass);
classes.delete('/:id', deleteClass);

export default classes;

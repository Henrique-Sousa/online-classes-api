import { Router } from 'express';

import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  createComment,
//  getClassComments,
//  deleteComment,
} from '../controllers/classController';

const classes = Router();

classes.post('/', createClass);
classes.get('/', getAllClasses);
classes.get('/:id', getClassById);
classes.put('/:id', updateClass);
classes.delete('/:id', deleteClass);

classes.post('/comments/', createComment);
// classes.get('/comments/', getClassComments);
// classes.delete('/comments/:id', deleteComment);

export default classes;

import { Router } from 'express';
import passport from 'passport';
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  createComment,
  getClassComments,
  deleteComment,
} from '../controllers/classController';

const classes = Router();

classes.post('/', passport.authenticate('jwt', { session: false }), createClass);
classes.get('/', passport.authenticate('jwt', { session: false }), getAllClasses);
classes.get('/:id', passport.authenticate('jwt', { session: false }), getClassById);
classes.put('/:id', passport.authenticate('jwt', { session: false }), updateClass);
classes.delete('/:id', passport.authenticate('jwt', { session: false }), deleteClass);

classes.post('/comments/', passport.authenticate('jwt', { session: false }), createComment);
classes.get('/:id/comments/', passport.authenticate('jwt', { session: false }), getClassComments);
classes.delete('/comments/:id', passport.authenticate('jwt', { session: false }), deleteComment);

export default classes;

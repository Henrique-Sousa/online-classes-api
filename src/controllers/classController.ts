import { controllerFunction } from './functions';
import Class from '../models/class';
import Comment from '../models/comment';

export const createClass: controllerFunction = async (req, res, next) => {
  if (req.body
      && req.body.name
      && req.body.description
      && req.body.video
      && req.body.date_init
      && req.body.date_end) {
    const {
      name, description, video, date_init, date_end,
    } = req.body;

    const date_created = new Date(Date.now());
    const date_updated = new Date(Date.now());

    const newClass = new Class({
      name,
      description,
      video,
      date_init,
      date_end,
      date_created,
      date_updated,
      total_comments: 0,
    });
    await newClass.save();
  }
  res.end();
};

export const getAllClasses: controllerFunction = async (req, res, next) => {
  const classes = await Class.find();
  res.send(classes);
};

export const getClassById: controllerFunction = async (req, res, next) => {
  const classResult = await Class.findById(req.params.id);
  res.send(classResult);
};

export const updateClass: controllerFunction = async (req, res, next) => {
  const {
    name, description, video, date_init, date_end,
  } = req.body;

  const date_updated = new Date(Date.now());

  const newClass = new Class({
    _id: req.params.id,
    name,
    description,
    video,
    date_init,
    date_end,
    date_updated,
    total_comments: 0,
  });
  await Class.findByIdAndUpdate(req.params.id, newClass);
  res.end();
};

export const deleteClass: controllerFunction = async (req, res, next) => {
  await Class.findByIdAndRemove(req.params.id);
  res.end();
};

export const createComment: controllerFunction = async (req, res, next) => {
  if (req.body
      && req.body.id_class
      && req.body.comment) {
    const {
      id_class, comment,
    } = req.body;

    const date_created = new Date(Date.now());

    const newComment = new Comment({
      id_class,
      comment,
      date_created,
    });
    await newComment.save();
  }
  res.end();
};

export const getClassComments: controllerFunction = async (req, res, next) => {
  const comments = await Comment.find({ id_class: req.params.id });
  res.send(comments);
};

export const deleteComment: controllerFunction = async (req, res, next) => {
  await Comment.findByIdAndRemove(req.params.id);
  res.end();
};

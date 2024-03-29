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
  const classesToSend = [];
  let last_comment;
  let last_comment_date;

  for (const class_ of classes) {
    const {
      _id,
      name,
      description,
      video,
      date_init,
      date_end,
      date_created,
      date_updated,
      total_comments,
    } = class_;

    const comment = await Comment.find({ id_class: class_.id })
    .sort({ date_created: -1 })
    .limit(1);

    if (comment[0]) {
      last_comment = comment[0].comment;
      last_comment_date = comment[0].date_created;
      const classToSend = {
        _id,
        name,
        description,
        video,
        date_init,
        date_end,
        date_created,
        date_updated,
        total_comments,
        last_comment,
        last_comment_date,
      };
      classesToSend.push(classToSend);
    } else {
      const classToSend = {
        _id,
        name,
        description,
        video,
        date_init,
        date_end,
        date_created,
        date_updated,
        total_comments,
      };
      classesToSend.push(classToSend);
    }
  }
  res.send(classesToSend);
};

export const getClassById: controllerFunction = async (req, res, next) => {
  const classResult = await Class.findById(req.params.id);
  if (classResult) {
    const {
      _id,
      name,
      description,
      video,
      date_init,
      date_end,
      date_created,
      date_updated,
      total_comments,
    } = classResult;
    const comments = await Comment.find({ id_class: req.params.id })
    .sort({ date_created: -1 })
    .limit(3);
    const classToSend = {
      _id,
      name,
      description,
      video,
      date_init,
      date_end,
      date_created,
      date_updated,
      total_comments,
      comments: comments.map((c) => c.comment),
    };
    res.send(classToSend);
  } else {
    res.end();
  }
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
    const classResult = await Class.findById(req.body.id_class);

    if (!classResult) {
      res.send('Class id not found on database\n');
    }

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

    await Class.findOneAndUpdate(
      { _id: id_class },
      { $inc: { total_comments: 1 } },
    );
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

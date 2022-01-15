import { Request, Response, NextFunction } from 'express';
import { controllerFunction } from './functions';
import Class from '../models/class';

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

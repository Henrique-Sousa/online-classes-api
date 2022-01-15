import request from 'supertest';
import express from 'express';
import { connect, connection } from 'mongoose';
import Class from '../models/class';
import classesRouter from '../routes/classes';

async function run(): Promise<void> {
  await connect('mongodb://localhost:27017/tindin-test');
}

beforeEach(() => (
  run().catch((err) => console.log(err))
));

afterEach(() => (
  connection.close()
));

interface SentData {
  name: string,
  description: string,
  video: string
  date_init: Date,
  date_end: Date,
}

const class1: SentData = {
  name: 'Aula 1',
  description: 'Primeira aula',
  video: 'url 1',
  date_init: new Date('2021-02-01'),
  date_end: new Date('2021-02-31'),
};

const class2: SentData = {
  name: 'Aula 2',
  description: 'Segunda aula',
  video: 'url 2',
  date_init: new Date('2021-03-01'),
  date_end: new Date('2021-03-31'),
};

async function insertObject(class_: SentData) {
  const {
    name, description, video, date_init, date_end,
  } = class_;

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

const app = express();
app.use(express.json());

app.use('/classes', classesRouter);

test('GET /classes', async () => {
  insertObject(class1);
  insertObject(class2);

  const result = await request(app)
    .get('/classes')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body[0].name).toBe('Aula 1');
  expect(result.body[1].name).toBe('Aula 2');
  await Class.remove({ name: 'Aula 1' });
  await Class.remove({ name: 'Aula 2' });
});
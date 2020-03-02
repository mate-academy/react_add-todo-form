/* eslint-disable max-len */
import { v4 as uuidv4 } from 'uuid';

const todos = [
  {
    taskIndex: 1,
    userId: 1,
    id: uuidv4(),
    title: 'delectus aut autem',
    completed: false,
  },
  {
    taskIndex: 2,
    userId: 1,
    id: uuidv4(),
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
];

export default todos;

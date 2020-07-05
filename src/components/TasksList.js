import React from 'react';
import { TodoShape } from './Shapes';
import { Task } from './Task';

export const TaskList = ({ todos }) => (
  <div>
    Tasks:
    {todos.map(todo => (
      <Task {...todo} />
    ))}
  </div>
);

TaskList.propTypes = TodoShape.isRequired;

import React from 'react';
import { Todo } from './Todo/Todo';
import { TodoListShape } from './shapes/TodoListShape';

export const TodoList = ({ tasks }) => (
  <ul>
    {
      tasks.map(task => (
        <Todo key={task.id} {...task} />
      ))
    }
  </ul>
);

TodoList.propTypes = TodoListShape;

import React from 'react';
import { allTodos } from '../../types/types';
import { User } from '../User/User';

export const TodoItem = ({ todo }) => (
  <div className="todo-item">
    <h2>{todo.title}</h2>
    <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
    <User user={todo.user} />
  </div>
);

TodoItem.propTypes = {
  todo: allTodos.isRequired,
};

import React from 'react';
import propTypes from 'prop-types';
import './TodoList.css';
import { User } from './User';
import { TodosShape } from '../shapes/TodosShape';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(({ id, user, title }) => (
      <User
        id={id}
        user={user}
        title={title}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: propTypes.arrayOf(propTypes.shape(TodosShape)).isRequired,
};

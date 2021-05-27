import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todosArr }) => (
  <ol className="TodoList">
    {todosArr.map(todo => (
      <li key={todo.id} className="TodoList__item">
        <Todo {...todo} />
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todosArr: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

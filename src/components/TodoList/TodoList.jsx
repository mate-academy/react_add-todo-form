import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { Todo } from '../Todo';

export const TodoList = ({ list }) => (
  <div className="todo">
    <ul className="todo__list">
      {list.map(todo => (
        <li key={todo.id} className="todo__item">
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

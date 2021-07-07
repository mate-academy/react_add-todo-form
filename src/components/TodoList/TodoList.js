import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { Todo } from '../Todo';

export const TodoList = ({ todosPrep }) => (
  <ul className="list">
    {todosPrep.map(todoPrep => (
      <li className="list__item" key={todoPrep.id}>
        <Todo {...todoPrep} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todosPrep: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

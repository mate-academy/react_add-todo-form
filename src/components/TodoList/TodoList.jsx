import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ list }) => (

  <ul className="list">
    {list.map(todo => (
      <li key={todo.id} className="list__item item">
        <Todo {...todo} />
      </li>
    ))}
  </ul>

);

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

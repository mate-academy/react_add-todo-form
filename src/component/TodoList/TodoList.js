import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import { Todo } from '../Todo/Todo';

export const TodoList = ({ list }) => (
  <ul>
    {list.map(todo => (
      <li className="list__item" key={todo.id}>
        <Todo todo={todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};

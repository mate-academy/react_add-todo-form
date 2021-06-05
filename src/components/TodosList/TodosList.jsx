import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

import './TodosList.scss';

export const TodosList = React.memo(({ todosList, checkForCompleted }) => (

  <ul className="todos">
    {todosList.map(todo => (
      <li key={todo.id} className="todos-list__item todo">
        <Todo
          todo={todo}
          checkForCompleted={checkForCompleted}
        />
      </li>
    ))}
  </ul>
));

TodosList.propTypes = {
  todosList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  checkForCompleted: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import Todo from '../Todo/Todo';

import './TodoList.scss';

const TodoList = function({ preparedTodos }) {
  return (
    <ul className="TodoList">
      {preparedTodos.map(todo => (
        <li className="Todo" key={todo.id}>
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TodoList;

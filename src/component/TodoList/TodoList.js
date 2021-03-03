import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.css';

export const TodoList = ({ todos, selectValue, status }) => (
  <div className="TodoList" hidden={selectValue === 'Choose a user'}>
    <h1>{selectValue === 'Choose a user' ? '' : selectValue}</h1>
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          hidden={todo.hidden}
          className={todo.completed ? 'done' : 'active'}
        >
          <Todo {...todo} status={status} />
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectValue: PropTypes.string.isRequired,
  status: PropTypes.func.isRequired,
};

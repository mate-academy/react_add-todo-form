import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.css';

export const TodoList = ({ todos, selectValue, status }) => (
  <div className="TodoList" hidden={selectValue === 'Choose a user'}>
    {selectValue !== 'Choose a user' && (
      <h1>{selectValue}</h1>
    )}
    <ul>
      {todos.map(todo => (
        todo.user.name === selectValue && (
          <li
            key={todo.id}
            className={todo.completed ? 'done' : 'active'}
          >
            <Todo {...todo} status={status} />
          </li>
        )
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectValue: PropTypes.string.isRequired,
  status: PropTypes.func.isRequired,
};

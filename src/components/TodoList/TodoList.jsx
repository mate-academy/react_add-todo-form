import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TodoType } from '../../types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="box">
    {todos.map(todo => (
      <div key={todo.id}>
        <li className={
          classnames('subtitle description is-3', { completed: todo.completed })
          }
        >
          <span className="label">{todo.user.name}</span>
          {todo.title}
        </li>
        <hr />
      </div>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType),
};

TodoList.defaultProps = {
  todos: [],
};

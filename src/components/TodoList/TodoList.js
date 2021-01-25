import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.scss';
import { TodoShape } from '../../shapes/TodoShape';

export const TodoList = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li className="todoList__item" key={todo.id}>
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(TodoShape).isRequired,
  ).isRequired,
};

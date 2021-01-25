import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { TodoShape } from '../shapes/TodoShape';

export const TodoList = ({ todos }) => (
  <ul className="todoList list">
    {todos.map(
      todoItem => (
        <li
          className="box"
          key={todoItem.id}
        >
          <Todo todo={todoItem} />
        </li>
      ),
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};

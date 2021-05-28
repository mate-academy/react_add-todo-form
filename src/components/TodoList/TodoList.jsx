import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.scss';

const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(task => (
      <li className="todo__list-item" key={task.id}>
        <Todo {...task} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default TodoList;

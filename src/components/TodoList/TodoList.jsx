import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <div className="todosListWrapper">
    <span className="todosListTitle">List of Todos:</span>
    <ul className="todoList">
      {todos.map(todo => (
        <li className="userCard" key={todo.id}>
          <span className="taskId">
            task id:
            {todo.id}
          </span>
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

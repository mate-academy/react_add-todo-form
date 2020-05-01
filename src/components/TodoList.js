import React from 'react';
import PropTypes from 'prop-types';
import { TodoType } from '../typedefs/todoType';

const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <li key={todo.id} className="todo__item">
        <h2 className="todo__username">
          {todo.user.name}
        </h2>
        <p className="todo__title">
          {todo.title}
        </p>
        {todo.completed
          ? <span className="todo__completed todo__completed--success" />
          : <span className="todo__completed todo__completed--danger" />
        }
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};

export default TodoList;

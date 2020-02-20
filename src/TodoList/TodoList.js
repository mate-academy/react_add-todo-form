import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import User from '../User/User';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <ul className="card__list">
    {todos.map(todo => (
      <li className="card__item" key={todo.id}>
        <Todo {...todo} />
        <User {...todo.user} />
      </li>
    ))}
  </ul>

);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default TodoList;

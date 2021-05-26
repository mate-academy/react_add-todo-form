import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import './TodoList.css';

const TodoList = ({ todos }) => (
  todos.map(todo => (
    <ul className="list">
      <li key={todo.id} className="list__item">
        <Todo todo={todo} />
      </li>
    </ul>
  ))
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TodoList;

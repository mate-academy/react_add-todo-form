import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import './todoList.css';

const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <Todo {...todo} key={todo.id} />
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

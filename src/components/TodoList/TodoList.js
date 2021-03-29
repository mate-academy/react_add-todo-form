import PropTypes from 'prop-types';
import React from 'react';
import Todo from '../Todo/Todo';
import './TodoList.css';

export default function TodoList({ todos }) {
  return (
    <ul className="list">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

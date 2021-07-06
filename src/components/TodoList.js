import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  todos.map(todo => (
    <div key={todo.id} className="todo__item">
      <h2>
        {todo.id}
        .
        {' '}
        {todo.title}
      </h2>
      <p>{todo.user.name}</p>
      <p>{todo.completed ? 'completed' : 'not completed'}</p>
    </div>
  ))
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default TodoList;

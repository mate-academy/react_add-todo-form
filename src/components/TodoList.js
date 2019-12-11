import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li key={todo.id} className="list__item">
        <p>
          {todo.id}
        </p>
        <p className="list__title">
          {todo.title}
        </p>
        <p className="list__user">
          responsible: user
          {' '}
          {todo.userId}
          <span className="list__completed">
            {todo.completed ? '✅' : '❌' }
          </span>
        </p>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};

export default TodoList;

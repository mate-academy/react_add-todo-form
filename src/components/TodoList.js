import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <ol>
      <label>
        {todos.map(todo => (
          <li key={todo.id}>
            <div className="todo">
              Todo:
              {' '}
              {todo.title}
            </div>

            <div className="name">
              Name:
              {' '}
              {todo.user.name}
            </div>
          </li>
        ))}
      </label>
    </ol>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      complated: PropTypes.bool,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};

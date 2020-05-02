import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';

export const TodoList = ({ todos }) => (
  <div className="todo__list">
    {todos.map(todo => (
      <div
        key={todo.id}
        className={todo.completed
          ? 'todo todo--done'
          : 'todo'}
      >
        <p>
          <b>Name:</b>
          {' '}
          {todo.user.name}
        </p>
        <p>
          <b>Todo:</b>
          {' '}
          {todo.title}
        </p>
        <p>
          <b>Status:</b>
          {' '}
          {todo.completed ? 'Completed' : 'Pending'}
        </p>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};

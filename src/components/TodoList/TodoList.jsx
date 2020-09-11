import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <div className="todolist">
    <div className="todolist__header">
      <p>Name</p>
      <p>Task</p>
      <p>Status</p>
    </div>
    {todos.map(todo => (
      <div key={todo.id} className="todolist__item">
        <p>{`${todo.user.name} (id: ${todo.user.id})`}</p>
        <p>{todo.title}</p>
        <label
          htmlFor={`status-check-${todo.id}`}
          className="todolist__item--uncompleted"
        >
          Uncompleted
        </label>
        <input
          className="status-check"
          type="checkbox"
          id={`status-check-${todo.id}`}
          readOnly
        />
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

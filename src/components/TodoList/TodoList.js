import PropTypes from 'prop-types';
import React from 'react';
import './todoList.css';

export const TodoList = ({ users, todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li
        className="list-item"
        key={todo.id}
      >
        <div>

          <div className="user">
            {users.map(
              user => (user.id === todo.userId ? user.name : <></>),
            )}
          </div>

          <div className="text">
            {'- '}
            {todo.title}
          </div>

          <div className={todo.completed ? 'stateDone' : 'stateExecution'}>
            {todo.completed ? 'done' : 'to do'}
          </div>

        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = PropTypes.shape({
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
}).isRequired;

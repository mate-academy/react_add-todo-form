import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <div className="list">
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <User user={todo.user} />
          {`${todo.title} - `}
          <span>
            {todo.completed ? (
              <span className="list__status--done">Done</span>
            ) : (
              <span className="list__status--doing">Doing</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const UserType = {
  name: PropTypes.string.isRequired,
};

const TodoType = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape(UserType).isRequired,
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};

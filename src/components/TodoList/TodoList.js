import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { User } from '../User';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <div className="list">
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <p>
            <User user={todo.user} />
          </p>
          <p>
            {`${todo.title} - `}
            <span
              className={classNames(`todo__status`, {
                'todo__status--done': todo.completed,
              })}
            >
              {todo.completed ? 'Done' : 'Doing'}
            </span>
          </p>
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

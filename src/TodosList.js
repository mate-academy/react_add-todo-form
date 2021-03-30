import React from 'react';
import PropTypes from 'prop-types';

export const TodosList = ({ todos, users }) => (
  <ul className="todolist">
    {todos.map(todo => (
      <li key={todo.id}>
        <div className="todolist__card card">
          <div>
            {`Title: `}
            {todo.title}
          </div>
          <div>
            {`User: `}
            {
              users.find(user => todo.userId === user.id).name
            }
          </div>
          <div>
            {`Completed: `}
            {todo.completed
              ? (
                <span role="img" aria-label="Tick">
                  &#9989;
                </span>
              )
              : (
                <span role="img" aria-label="Cross">
                  &#10060;
                </span>
              )
            }
          </div>
        </div>
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

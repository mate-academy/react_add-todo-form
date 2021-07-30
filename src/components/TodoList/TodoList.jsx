import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <>
    <ul className="list">
      {todos.map((todo) => {
        const { id, title, userId, user, completed } = todo;

        return (
          <li key={id} className="list__item">
            <p>
              <strong>
                Title:
              </strong>
              {title}
            </p>
            <p>
              <strong>
                Author:
              </strong>
              {`${user.name} (${userId})`}
            </p>
            <p>
              <strong>Completed:</strong>
              {completed ? 'done' : 'in progress'}
            </p>
          </li>
        );
      })
      }
    </ul>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

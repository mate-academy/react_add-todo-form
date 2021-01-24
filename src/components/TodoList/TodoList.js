import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map((todo) => {
      const { id, title, user } = todo;

      return (
        <li key={id} className="list__item">
          <div className="list__title">
            {title}
          </div>
          <div className="list__user">
            {user.name}
          </div>
        </li>
      );
    })}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    user: PropTypes.object.isRequired,
  }).isRequired).isRequired,
};

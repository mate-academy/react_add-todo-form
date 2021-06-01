import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ usersTodos }) => (
  <ul>
    {usersTodos.map(user => (
      <li key={user.id}>
        {`User: ${user.name}`}
        <br />
        {`Todo: ${user.todo}`}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  usersTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      todo: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

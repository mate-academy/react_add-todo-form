import React from 'react';
import PropTypes from 'prop-types';

export const TodosList = ({ todoList }) => (
  <ul>
    {todoList.map(todo => (
      <li key={todo.id}>
        {`${todo.id}. ${todo.user.name}`}
        <br />
        { `${todo.title}: ${todo.comleted
          ? ' completed' : ' not completed'} `}
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      comleted: PropTypes.bool,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

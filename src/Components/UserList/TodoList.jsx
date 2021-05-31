import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ userList }) => (
  <ul>
    {userList.map(todo => (
      <li key={todo.id}>
        {`Name: ${todo.user}`}
        {', '}
        {`Todo: ${todo.title}`}
        {', '}
        {`Completed: ${todo.completed}`}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TodoList;

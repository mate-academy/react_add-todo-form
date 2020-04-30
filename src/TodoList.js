import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ preparedTodos }) => (
  <div className="list">
    {preparedTodos.map(oneOfUsersInfo => (
      <Todo {...oneOfUsersInfo} key={oneOfUsersInfo.id} />
    ))}
  </div>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  ).isRequired,
};

export default TodoList;

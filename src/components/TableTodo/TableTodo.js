import React from 'react';
import PropTypes from 'prop-types';

const TableTodo = ({ todos, users }) => (
  <table className="ui celled table">
    <thead>
      {' '}
      <tr>
        {' '}
        <th>Id</th>
        {' '}
        <th>Title</th>
        {' '}
        <th>User</th>
        {' '}
        <th>Status</th>
        {' '}
      </tr>
      {' '}
    </thead>
    {todos.map(todo => (
      <tr>
        <th>{todo.id}</th>
        <th>{todo.title}</th>
        <th>{users.find(person => person.id === todo.userId).name}</th>
        <th>{todo.completed ? 'Yes' : 'No'}</th>
      </tr>
    ))}
  </table>
);

TableTodo.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TableTodo;

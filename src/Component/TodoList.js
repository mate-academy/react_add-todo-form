import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

TodoList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
};

function TodoList({ todos }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table__heading">ID</th>
          <th className="table__heading">Title</th>
          <th className="table__heading">User</th>
        </tr>
      </thead>
      <TodoItem todos={todos} key={todos.id} />
    </table>
  );
}

export default TodoList;

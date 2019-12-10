import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, users }) => (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>TITLE</th>
        <th>USER</th>
        <th>STATUS</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          user={users.find(user => user.id === todo.userId)}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.string.isRequired,
  users: PropTypes.string.isRequired,
};

export default TodoList;

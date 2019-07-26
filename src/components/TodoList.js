import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Completed</th>
          <th>Title</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;

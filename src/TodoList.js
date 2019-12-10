import React from 'react';

import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
<div className="todolist-wrap">
  <table className="todolist-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>User name</th>
        <th>E-mail</th>
        <th>Phone</th>
        <th>Tasks</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
</div>
);

export default TodoList;

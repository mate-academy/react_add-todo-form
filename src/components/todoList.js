import React from 'react';
import TodoItem from './todoItem';

// eslint-disable-next-line react/prop-types
function TodoList({ todos }) {
  return (
    <div id="wrapper">
      <table className="todo ui celled table">
        <thead className="thead">
          <tr>
            <th>Item</th>
            <th>User</th>
            <th>Completeness</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;

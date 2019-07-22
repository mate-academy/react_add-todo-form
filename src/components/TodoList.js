/* eslint react/prop-types: 0 */
import React from 'react';

const TodoList = ({ todosWidthUsers }) => (
  <div>
    {todosWidthUsers.map(todo => (
      <div key={todosWidthUsers.id}>
        <h3>{todo.title}</h3>
        <input type="checkbox" checked={todo.completed} />
      </div>
    ))}
  </div>
);

export default TodoList;

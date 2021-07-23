import React from 'react';
import './TodoList.css';

function TodoList({ todos }) {
  return (
    <>
      {todos.map(todo => (
        <div key={todo.id}>
          <h3>
            {todo.user.name}
            :
            {` `}
            <span className="todo-title">
              {todo.title}
            </span>
          </h3>
        </div>
      ))}
    </>
  );
}

export default TodoList;

import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
  const { todo } = props;

  return (
    <div className="card">
      <div>
        <span className="card-title">Title: </span>
        {todo.title}
      </div>
      <hr />
      <div>
        <span className="card-title">Status: </span>
        {todo.completed
          ? 'Completed'
          : 'In progress'}
      </div>
      <hr />
      <div>
        <span className="card-title">Assigned to: </span>
        <span>{todo.user.name}</span>
      </div>
    </div>
  );
}

export default TodoItem;

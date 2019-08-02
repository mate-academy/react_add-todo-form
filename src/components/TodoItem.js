import React from 'react';
import User from './User';

function TodoItem({ item, user }) {
  return (
    <div className="todos-item">
      <p>ID:{item.id}</p>
      <p>Title:{item.title}</p>
      <p>
        Completed:
        <input type="checkbox" defaultChecked={item.completed} />
      </p>
      <User user={item.user} />
    </div>
  );
}

export default TodoItem;

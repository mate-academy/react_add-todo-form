import React from 'react';
import User from '../User/User';

const TodoItem = ({ todo }) => {
  const { completed, title, user } = todo;
  const isCompleted = completed ? 'todo-list__item--is-completed' : '';

  return (
    <div className="col-md-6 col-lg-4 mb-5">
      <div className={`todo-list__item ${isCompleted}`}>
        <h2>{title}</h2>
        <User user={user} />
      </div>
    </div>
  );
}

export default TodoItem;
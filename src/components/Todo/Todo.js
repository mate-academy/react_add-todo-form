import React from 'react';
import { User } from '../User/User';
import { TodoShape } from '../shapes/TodoShape';

export const Todo = ({ todo }) => {
  const statusModifier = todo.completed ? 'todo__status--completed' : '';

  return (
    <div className="todo notification is-primary">
      <p className="todo__task title has-text-dark">{todo.title}</p>
      <User user={todo.user} />
      <div className={`todo__status ${statusModifier}`}>
        <p className="subtitle">{todo.completed ? 'Done' : 'In progress'}</p>
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: TodoShape.isRequired,
};

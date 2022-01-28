import React from 'react';

type TodosProps = {
  todo: Todo
};

export const TodoInfo:React.FC<TodosProps> = ({ todo }) => (
  <>
    <p className="todo__title">{todo.title}</p>
    <div className="todo__status">
      <div className={todo.completed ? 'todo__completed-green' : 'todo__completed-red'}> </div>
    </div>
  </>
);

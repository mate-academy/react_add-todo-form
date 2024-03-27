import React from 'react';

interface TodoGeneral {
  id: number;
  title: string;
  completed: boolean;
  name?: string;
  email?: string;
}

export const TodoInfo: React.FC<{ todo: TodoGeneral }> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={`mailto:${todo.email}`}>
        {todo.name}
      </a>
    </article>
  );
};

export default TodoInfo;

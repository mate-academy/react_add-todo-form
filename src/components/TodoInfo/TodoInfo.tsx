import React from 'react';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <a className="UserInfo" href={`mailto:user${todo.userId}@example.com`}>
        {`User ${todo.userId}`}
      </a>
    </article>
  );
};

import React from 'react';
import users from '../../api/users';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const interactor = users.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <a className="UserInfo" href={`mailto:${interactor?.email}`}>
        {interactor?.name}
      </a>
    </article>
  );
};

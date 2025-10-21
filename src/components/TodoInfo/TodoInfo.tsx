import React from 'react';

type User = {
  id: number;
  name: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const completedClass = todo.completed ? 'TodoInfo--completed' : '';

  return (
    <div className={`TodoInfo ${completedClass}`} data-id={todo.id}>
      <h3 className="TodoInfo__title">{todo.title}</h3>
      <a className="UserInfo" href={`mailto:${todo.user?.email || ''}`}>
  {todo.user?.name || `User #${todo.userId}`}
</a>
    </div>
  );
};

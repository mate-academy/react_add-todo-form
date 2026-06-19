import { FC } from 'react';
import { UserInfo } from '../UserInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};

import cn from 'classnames';

import { UserInfo } from '../UserInfo';

export interface Todo {
  user: {
    id: number,
    name: string,
    email: string,
    username: string,
  } | null,
  id: number,
  title: string,
  completed: boolean;
  userId: number;
}

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <li
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} /> }
    </li>
  );
};

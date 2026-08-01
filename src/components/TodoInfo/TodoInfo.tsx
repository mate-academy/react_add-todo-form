import classNames from 'classnames';

import { UserInfo, type User } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};

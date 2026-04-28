import { UserInfo } from '../UserInfo';
import type { User } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

type Props = {
  todo: Todo;
  // user: User;
};

export const TodoInfo = ({ todo }: Props) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />

      {/* <UserInfo {...user} /> */}
    </article>
  );
};

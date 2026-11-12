import { UserInfo } from '../UserInfo';
import type { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const { completed, id, title, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo${completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};

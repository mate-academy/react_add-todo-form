import { UserInfo } from '../UserInfo';
import { TodoUser } from '../../types/Todo';

type TodoProps = {
  todo: TodoUser
};

export const TodoInfo = ({
  todo: {
    id,
    title,
    completed,
    user,
  },
}: TodoProps) => (
  <article
    data-id={id}
    className={`TodoInfo${completed ? ' TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">
      {title}
    </h2>

    {user && <UserInfo user={user} />}
  </article>
);

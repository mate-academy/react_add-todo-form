import { UserInfo } from '../UserInfo';

import { Todo, User } from '../../services/types';

interface Props {
  todo: Todo & { user?: User };
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user } = todo;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo?.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};

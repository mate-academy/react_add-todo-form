import { UserInfo } from '../UserInfo';

import { Todo, User } from '../../services/types';

interface Props {
  todo: Todo & { user?: User };
  user?: User;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const currentUser = user || todo.user;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo?.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {currentUser && <UserInfo user={currentUser} />}
    </article>
  );
};

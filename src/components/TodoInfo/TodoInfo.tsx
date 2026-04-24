import { Todo, User } from '../../types/types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo & { user?: User };
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};

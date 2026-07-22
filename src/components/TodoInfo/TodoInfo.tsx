import { Todo } from '../../api/types/Todo';
import { UserInfo } from '../UserInfo';
import { User } from '../../api/types/User';

type Props = {
  todo: Todo & {
    user?: User;
  };
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};

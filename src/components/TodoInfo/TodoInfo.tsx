import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { completed, user } = todo;

  return completed ? (
    <article className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  ) : (
    <article className="TodoInfo" data-id={todo.id}>
      <h2 className="TodoInfo__title" data-id={todo.id}>
        {todo.title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};

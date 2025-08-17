import { Todo } from '../../types/index';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};
export const TodoInfo = ({ todo }: Props) => {
  const isCompleted = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article data-id={todo.id} className={isCompleted}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};

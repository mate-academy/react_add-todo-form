import { Todo } from '../../types/Types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const getClassName = () =>
    `TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`;

  return (
    <article data-id={todo.id} className={getClassName()}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};

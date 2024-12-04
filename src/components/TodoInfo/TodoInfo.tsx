import { TodosWithUsers } from '../../type.ts/TodosWithUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodosWithUsers;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoCompleted = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article data-id="1" className={todoCompleted}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

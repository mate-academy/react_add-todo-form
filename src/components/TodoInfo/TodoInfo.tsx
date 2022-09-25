import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const isCompleted = todo.completed ? 'TodoInfo--completed' : 'TodoInfo';

  return (
    <article data-id="1" className={isCompleted}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && <UserInfo user={todo.user} />}

    </article>
  );
};

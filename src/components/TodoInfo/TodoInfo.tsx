import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type PrepareTodo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number
  user?: {
    id: number,
    name: string,
    username: string,
    email: string
  },
};

type Props = {
  todo: PrepareTodo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={`${todo.id}`}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={todo.user} />
    </article>
  );
};

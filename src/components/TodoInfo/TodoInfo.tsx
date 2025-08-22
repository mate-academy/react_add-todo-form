import cn from 'classnames';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number | null;
    user?: {
      id: number;
      name: string;
      username: string;
      email: string;
    } | null;
  };
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  if (!todo.user) {
    return <span>No user</span>;
  }

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};

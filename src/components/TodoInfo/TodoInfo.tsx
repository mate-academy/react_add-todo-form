import { TodoWithUser } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: TodoWithUser;
}

export const TodoInfo = ({ todo: { user, ...todo } }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo TodoInfo${todo.completed && '--completed'}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user ? <UserInfo user={user} /> : 'User not found'}
    </article>
  );
};

import ToDo from '../../types/todo';
import User from '../../types/user';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface Props {
  users: User[];
  todo: ToDo;
}

export const TodoInfo: React.FC<Props> = ({ users, todo }) => {
  const { userId, title, completed, id } = todo;

  const findUser = users.find(user => user.id === userId);

  return (
    <article
      data-id={String(id)}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {findUser ? <UserInfo user={findUser} /> : <p>No matching user found</p>}
    </article>
  );
};

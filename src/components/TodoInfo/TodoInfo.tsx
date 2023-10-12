import cn from 'classnames';
import { TodoAndUser } from '../../types/TodoAndUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoAndUser
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, completed, title, User: user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};

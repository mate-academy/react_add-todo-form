import ToDo from '../../types/ToDo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface Props {
  todo: ToDo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, userId, title, completed, id } = todo;

  return (
    <article
      data-id={String(id)}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {userId && <UserInfo user={user ?? null} />}
    </article>
  );
};

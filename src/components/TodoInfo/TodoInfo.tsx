import { UserInfo } from '../UserInfo';
import { Todo } from '../types/types';
import cn from 'classNames';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo: { id, title, completed, user },
}) => {
  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};

import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id, completed, title, user,
  },
}) => (
  <article
    className={cn('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
    data-id={id}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && (<UserInfo user={user} />)}
  </article>
);

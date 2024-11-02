import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, user, id, completed } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo box', {
        'has-background-primary-light': completed,
        'has-background-danger-light': !completed,
        'TodoInfo--completed': completed,
      })}
    >
      <h2
        className={cn('TodoInfo__title title is-5', {
          'has-text-success': completed,
          'has-text-danger': !completed,
        })}
      >
        {title}
      </h2>

      {user && <UserInfo user={user as User} />}
    </article>
  );
};

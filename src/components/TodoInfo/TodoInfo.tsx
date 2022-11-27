import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todos: Todo
};

export const TodoInfo: React.FC<Props> = ({ todos }) => {
  const {
    title,
    completed,
    user,
  } = todos;

  return (
    <article
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};

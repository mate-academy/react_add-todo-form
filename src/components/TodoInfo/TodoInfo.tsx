import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  maxId: number;
};

export const TodoInfo: React.FC<Props> = ({ todo, maxId }) => {
  const {
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={maxId}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};

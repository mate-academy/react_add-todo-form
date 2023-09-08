import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types/types';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  const todoInfoClasses = classNames('TodoInfo', {
    'TodoInfo--completed': completed,
  });

  return (
    <article className={todoInfoClasses}>
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};

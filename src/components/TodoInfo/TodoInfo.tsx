import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    id,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};

import classNames from 'classnames';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
    user,
  } = todo;

  return (
    <article
      key={id}
      data-id={userId}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user
        && <UserInfo key={user.id} user={user} />}
    </article>
  );
};

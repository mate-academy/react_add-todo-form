import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};

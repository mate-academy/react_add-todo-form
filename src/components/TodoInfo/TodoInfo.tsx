import classNames from 'classnames';
import { TodoAndUser } from '../../types/types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TodoAndUser
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    user,
    id,
    completed,
    title,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      { user && <UserInfo user={user} />}
    </article>
  );
};

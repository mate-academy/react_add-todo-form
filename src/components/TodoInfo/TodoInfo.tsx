import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: todoList,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    user,
    completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo', {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};

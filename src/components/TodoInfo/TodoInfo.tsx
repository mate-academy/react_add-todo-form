import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    user,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', 'message-body', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title block">{title}</h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};

import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    user,
    title,
    completed,
  } = todo;

  return (
    <article
      key={id}
      data-id={`${id}`}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};

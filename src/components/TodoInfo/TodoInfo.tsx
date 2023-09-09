import classNames from 'classnames';
import { TodoWithUser } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo',
        {
          'TodoInfo--completed': completed,
        })}
      key={id}
    >
      <h2
        className="TodoInfo__title"
        style={{
          color: completed ? 'green' : 'red',
        }}
      >
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};

import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

type Props = {
  todo: Todo,
  user: User,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    userId,
    user,
  } = todo;

  return (
    <article
      data-id={userId}
      className={
        classNames(
          'TodoInfo',
          { 'TodoInfo--completed': completed },
        )
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <a className="UserInfo" href={`mailto: ${user.email}`}>
          {user.name}
        </a>
      )}
    </article>
  );
};

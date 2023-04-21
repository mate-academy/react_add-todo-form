import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

type Props = {
  todo: Todo,
  users: User[],
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const {
    title,
    completed,
    userId,
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

      <a className="UserInfo" href={users[userId - 1].email}>
        {users[userId - 1].name}
      </a>
    </article>
  );
};

import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

type Props = {
  todo: Todo,
  user: User,
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const {
    title,
    completed,
    userId,
  } = todo;

  const { name, email } = user;

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

      <a className="UserInfo" href={`mailto: ${email}`}>
        {name}
      </a>
    </article>
  );
};

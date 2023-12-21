import classnames from 'classnames';
import usersFromServer from '../../api/users';

import { Todo } from '../../type/todo';
import { User } from '../../type/user';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = (
  {
    todo: {
      id, completed, title, userId,
    },
  },
) => {
  const currentUser: User | undefined
  = usersFromServer.find((person: User) => person.id === userId);

  return (
    <article
      data-id={id}
      className={classnames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <a className="UserInfo" href={`mailto:${currentUser?.email}`}>
        {currentUser?.name}
      </a>
    </article>
  );
};

import { FC } from 'react';
import { Todo } from '../../api/todos';
import { User } from '../../api/users';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

interface Props {
  todo: Todo;
  // user?: User;
}

export const TodoInfo: FC<Props> = props => {
  const { todo} = props;
  const { id, completed, title, userId } = todo;

  const filteredUser = usersFromServer.find(
    (user: User): boolean => user.id === userId,
  );

  return (
    <article
      data-id={id}
      className={completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={filteredUser} />
    </article>
  );
};

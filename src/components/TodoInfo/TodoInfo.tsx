import { FC } from 'react';
import { Todo } from '../../api/todos';
import { User } from '../../api/users';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  users: User[];
}

export const TodoInfo: FC<Props> = props => {
  const { todo, users } = props;
  const { id, completed, title, userId } = todo;

  const filteredUser = users.find((user: User): boolean => user.id === userId);

  return (
    <article
      data-id={id}
      className={completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {filteredUser ? (
        <UserInfo user={filteredUser} />
      ) : (
        <p>User not found</p>
      )}
    </article>
  );
};

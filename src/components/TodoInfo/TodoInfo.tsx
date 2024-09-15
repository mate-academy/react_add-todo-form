import cl from 'classnames';
import users from '../../api/users';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const getUser = (id: number): User | undefined => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i];
      }
    }

    return;
  };

  return (
    <article
      data-id={todo.id}
      className={cl('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={getUser(todo.userId)} />
    </article>
  );
};

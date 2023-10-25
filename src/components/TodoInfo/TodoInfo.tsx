import cn from 'classnames';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';
import userFromServer from '../../api/users';
import { User } from '../../types/user';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoUser = userFromServer.find((user: User) => user.id === todo.userId);

  return (
    <>
      <article
        data-id={todo.id}
        className={
          cn('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })
        }
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>

        {todoUser && <UserInfo user={todoUser} />}
      </article>
    </>
  );
};

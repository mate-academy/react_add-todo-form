import cn from 'classnames';
import { User } from '../../types/User';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

function getUserById(usersId: number): User | undefined {
  return usersFromServer.find(user => user.id === usersId);
}

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  {
    return (
      <article
        data-id="1"
        className={cn('TodoInfo', {
          'TodoInfo--completed': todo.completed,
        })}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          {getUserById(todo.userId)?.name}
        </a>
      </article>
    );
  }
};

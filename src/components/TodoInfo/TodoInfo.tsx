import cn from 'classnames';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Post } from '../Types/Post';
import { User } from '../Types/User';

type Props = {
  todo: Post,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {usersFromServer.map((user: User) => user.id === todo.userId && (
      <UserInfo
        user={user}
        key={user.id}
      />
    ))}
  </article>
);

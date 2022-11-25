import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

interface TodosList {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

type Props = {
  todo: TodosList;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const found = (userId: number) => {
    return usersFromServer.find(user1 => user1.id === userId);
  };

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={found(todo.userId)} />
    </article>
  );
};

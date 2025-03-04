import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type ToDo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = usersFromServer.find(oneUser => oneUser.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};

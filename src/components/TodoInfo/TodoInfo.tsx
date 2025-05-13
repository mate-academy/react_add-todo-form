import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => {
  const userInfo = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {userInfo && <UserInfo
        user={userInfo}
      />}
    </article>
  );
};

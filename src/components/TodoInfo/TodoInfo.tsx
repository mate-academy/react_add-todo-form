import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { TodoInfoProps } from './TodoInfo.types';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const user
  = usersFromServer.find((todoUser) => todoUser.id === todo.userId);

  return (
    <article data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};

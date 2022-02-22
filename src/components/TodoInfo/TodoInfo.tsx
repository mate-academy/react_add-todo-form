import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = ({
  title,
  completed,
  user,
}) => {
  const status = completed ? 'Completed' : 'Not completed';

  return (
    <div className="todo">
      <p className="todo__title">{title}</p>
      <span>{status}</span>
      {user && <UserInfo {...user} />}
    </div>
  );
};

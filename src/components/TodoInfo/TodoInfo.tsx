import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/todo';
import './TodoInfo.css';

export const TodoInfo: React.FC<Todo> = ({ title, completed, user }) => {
  const complating = completed ? 'Completed' : 'Not completed yet!';

  return (
    <div className="todo">
      <h3>{title}</h3>
      <p className={completed === true ? 'todo__status' : 'todo__red'}>
        Status:
        {complating}
      </p>
      {user && <UserInfo name={user.name} email={user.email} />}
    </div>
  );
};

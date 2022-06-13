import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = ({ title, completed, user }) => (
  <>
    <h3 className="todo--title">{title}</h3>
    <p className="todo--status">
      {'Status: '}
      {completed ? 'completed' : 'not completed'}
    </p>
    <p className="todo--userdata">
      <span className="todo--userdata-header">User data:</span>
      <br />
      {user ? <UserInfo {...user} /> : 'User not found'}
    </p>
  </>
);

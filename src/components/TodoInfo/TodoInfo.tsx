import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <>
      <h3 className="todo--title">{title}</h3>
      <p className="todo--status">
        {`Status: ${completed ? 'completed' : 'not completed'}`}
      </p>
      <p className="todo--userdata">
        <span className="todo--userdata-header">User data:</span>
        <br />
        {user ? <UserInfo user={user} /> : 'User not found'}
      </p>
    </>
  );
};

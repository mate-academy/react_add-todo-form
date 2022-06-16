import { Todo } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <>
    <h3 className="todo-info__title">
      {`Task: ${title}`}
    </h3>
    <p>
      Status :
      {completed ? ' finished' : ' in progress'}
    </p>
    {user && <UserInfo user={user} /> }
  </>
);

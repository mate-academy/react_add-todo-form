import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoInfo.scss';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
}) => {
  const status = completed ? 'completed' : 'not completed';

  return (
    <>
      <h2 className="todo__title">
        {title}
      </h2>

      <div className="todo__status">
        Status:
        {' '}
        {status}
      </div>

      {user && (
        <div className="todo__user user">
          <UserInfo
            name={user.name}
            email={user.email}
          />
        </div>
      )}
    </>
  );
};

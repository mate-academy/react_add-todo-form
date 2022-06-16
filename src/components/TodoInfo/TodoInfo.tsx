import { FC } from 'react';
import { PreparedTodos } from '../../app.typedefs';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: PreparedTodos;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    user,
  } = todo;

  return (
    <div className="todo-info">
      <h2 data-cy="title">
        {`The task is: ${title}`}
      </h2>
      <h3 data-cy="status">
        {
          completed
            ? 'The task is completed'
            : 'The task is NOT completed'
        }
      </h3>
      <h3>
        {
          user && (
            <UserInfo user={user} />
          )
        }
      </h3>
    </div>
  );
};

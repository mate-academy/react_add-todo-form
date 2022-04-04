import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 className="todo__title">{todo.title}</h2>
    <span>
      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </span>
    <br />
    <span className={classNames(
      'todo__status',
      {
        completed: todo.completed,
      },
    )}
    >
      {todo.completed ? 'Completed' : 'Not completed'}
    </span>
  </>
);

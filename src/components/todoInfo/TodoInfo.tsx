import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <div className="todo">
    <div className="todo__title">{todo.title}</div>
    <div className="todo__info">
      <input type="checkbox" checked={todo.completed} />
      {todo.completed
        ? <span className="todo__completed">Completed</span>
        : <span className="todo__not-completed">Not completed</span>}
      {todo.user && <UserInfo user={todo.user} />}
    </div>
  </div>
);

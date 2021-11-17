import { Todo } from './types';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo-info">
    <div className="task todo-info__task">
      <input type="checkbox" checked={todo.completed} />
      <span className="task__title">{ todo.title }</span>
    </div>
    <div className="todo-info__author">{`UserID: ${todo.userId}`}</div>
  </div>
);

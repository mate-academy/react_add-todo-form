import { Todo } from '../../types/Todo';
import './TodoInfo.css';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="info-container">
      <p
        className="todo-title"
      >
        <b>Title:</b>
        {' '}
        {todo.title}
      </p>
      {' '}
      {todo.completed
        ? <p className="completed-todo">completed</p>
        : <p className="todo-in-progress">in progress</p>}
    </div>
  );
};

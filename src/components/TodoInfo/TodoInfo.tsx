import { UserInfo } from '../UserInfo/UserInfo';
import './todoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo-item">
    <UserInfo user={todo.user} />
    <p className="todo-item__title">{`Todo: ${todo.title}`}</p>
    {todo.completed
      ? <span className="todo-item__status-completed">Completed</span>
      : <span className="todo-item__status-notcompleted">Need to do</span>}
  </div>
);

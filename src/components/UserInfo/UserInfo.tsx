import { Todo } from '../../Types';

export const UserInfo:React.FC<Todo> = ({ ...todo }) => (
  <>
    <div className="todo__name">
      {todo.user?.name}
    </div>
    <div className="todo__mail">
      {todo.user?.email}
    </div>
  </>
);

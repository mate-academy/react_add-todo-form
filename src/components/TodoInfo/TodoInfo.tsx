import { TodoListType } from '../../api/type/type';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

interface TodoProps {
  todo: TodoListType;
}

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};

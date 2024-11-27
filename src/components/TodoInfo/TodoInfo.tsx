import { TodoListType } from '../../api/type/type';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';
import cn from 'classnames';

interface TodoProps {
  todo: TodoListType;
}

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

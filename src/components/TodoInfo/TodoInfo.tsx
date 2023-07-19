/* eslint-disable import/no-cycle */
import { Todo } from '../../App';
import { TodoListProps } from '../TodoList';
import { UserInfo } from '../UserInfo/UserInfo';

interface TodoInfoProps extends TodoListProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

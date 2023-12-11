import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/todo';

type ToDosType = {
  todo: Todo
};

export const TodoInfo = ({ todo }: ToDosType) => {
  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={todo.completed
        ? 'TodoInfo TodoInfo--completed'
        : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user ? <UserInfo key={todo.id} user={todo.user} /> : null}
    </article>
  );
};

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {
        todo.user
        && <UserInfo user={todo.user} key={todo.user.id} />
      }
    </article>
  );
};

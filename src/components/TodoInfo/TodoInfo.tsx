import { UserInfo } from '../UserInfo';
import { TodoWithUserProps } from '../../types';

export const TodoInfo = ({ todo }: { todo: TodoWithUserProps }) => {
  return (
    <article
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-cy="TodoInfo"
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title" data-cy="TodoTitle">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};

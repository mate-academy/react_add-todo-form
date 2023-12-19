import { TodoInfoProps } from '../../types';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

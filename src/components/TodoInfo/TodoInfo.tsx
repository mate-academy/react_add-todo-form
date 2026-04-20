import { UserInfo } from '../UserInfo';
import { TodoInfoProps } from '../../types/Types';

export const TodoInfo = ({ user, todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
};

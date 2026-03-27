import type { InfoRender } from '../../types/InfoRender';
import { UserInfo } from '../UserInfo/UserInfo';

type TodoInfoProps = {
  todo: InfoRender;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  if (!todo) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};

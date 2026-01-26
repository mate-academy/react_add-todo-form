import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/types';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};

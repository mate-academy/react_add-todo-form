import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/todo';

interface Props {
  todo: Todo;
}
export const TodoInfo = ({ todo }: Props) => {
  const { id, title, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};

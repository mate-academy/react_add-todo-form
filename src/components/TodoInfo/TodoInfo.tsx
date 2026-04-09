import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props): JSX.Element => {
  const shownUser = todo.user;

  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {shownUser && <UserInfo user={shownUser} />}
    </article>
  );
};

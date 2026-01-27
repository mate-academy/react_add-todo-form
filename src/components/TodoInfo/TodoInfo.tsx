import { Task } from '../../types/Task';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Task;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={'TodoInfo ' + (todo.completed ? 'TodoInfo--completed' : '')}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};

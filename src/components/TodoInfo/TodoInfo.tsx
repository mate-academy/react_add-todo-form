import { ToDoUser } from '../../types/ToDoUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDoUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

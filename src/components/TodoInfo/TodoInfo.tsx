import { Todo, User } from '../../App';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo & {
    user: User;
  };
};

export const TodoInfo = ({ todo }: TodoInfoProps) => (
  <>
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  </>
);

import { UserInfo } from '../UserInfo';
import { Todo } from '../../App';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={
        todo.completed === true ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'
      }
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};

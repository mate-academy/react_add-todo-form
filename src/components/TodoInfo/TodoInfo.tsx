import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed === true && 'TodoInfo--completed'}`}
      key={todo.title + todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      { todo.userId && (
        <UserInfo user={todo.userId} />
      )}
    </article>
  );
};

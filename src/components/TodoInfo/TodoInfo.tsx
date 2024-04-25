import { Todo } from '../../App';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <>
      <article
        data-id={todo.id}
        className={cn({
          TodoInfo: true,
          'TodoInfo--completed': todo.completed,
        })}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>
        <UserInfo user={todo.user} />
      </article>
    </>
  );
};

import { Todo } from '../../types/typeTodo';
import { User } from '../../types/typeUser';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';
type Props = {
  user: User;
  todoData: Todo;
};

export const TodoInfo = ({ user, todoData }: Props) => {
  return (
    <article
      data-id={todoData.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todoData.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todoData.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};

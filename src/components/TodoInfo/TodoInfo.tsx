import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  // console.log(post);і

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo todo={todo} />
    </article>
  );
};

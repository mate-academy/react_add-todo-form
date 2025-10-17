import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo = (props: Props) => {
  const { todo } = props;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
      // className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

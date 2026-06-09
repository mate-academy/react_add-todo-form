import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo = (props: { todo: Todo }) => (
  <article
    data-id={props.todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': props.todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{props.todo.title}</h2>

    <UserInfo user={props.todo.user} />
  </article>
);

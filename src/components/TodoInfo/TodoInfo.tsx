import cn from 'classnames';

import { UserInfo } from '../UserInfo';

import { ToDo } from '../../types/ToDo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {
      todo.user && (
        <UserInfo user={todo.user} />
      )
    }
  </article>
);

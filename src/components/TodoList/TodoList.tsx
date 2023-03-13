import { FC } from 'react';
import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Types';

export const TodoList: FC<{ todos: Todo[] }> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(({
      title, user, id, completed,
    }) => (
      <article
        data-id={id}
        key={id}
        className={classNames(
          'TodoInfo',
          { 'TodoInfo--completed': completed },
        )}
      >
        <TodoInfo title={title} />

        <UserInfo name={user?.name || ''} email={user?.email || ''} />
      </article>
    ))}
  </section>
);

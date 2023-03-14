import { FC } from 'react';
import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';
import { TodoListType } from '../../Types/Types';

export const TodoList: FC<TodoListType> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map(({
      title,
      id,
      completed,
      userId,
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

        <UserInfo user={users.find(user => user.id === userId) || null} />
      </article>
    ))}
  </section>
);

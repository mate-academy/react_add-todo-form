import React from 'react';
import cn from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          key={todo.id}
          className={cn('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <TodoInfo title={todo.title} />
          <UserInfo userId={todo.userId} />
        </article>
      ))}
    </section>
  );
};

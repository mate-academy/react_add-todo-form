import React from 'react';
import cn from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
        >
          <TodoInfo todo={todo} />

          <UserInfo todo={todo} />
        </article>
      ))}
    </section>
  );
};

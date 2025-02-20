import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className={cn('TodoList')}>
    {todos.map((item, index) => (
      <TodoInfo key={index} todo={item} />
    ))}
  </section>
);

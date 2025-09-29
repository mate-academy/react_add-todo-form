import React from 'react';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section
    className={classNames('TodoList', {
      'TodoList--empty': todos.length === 0,
      'TodoList--filled': todos.length > 0,
    })}
  >
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);

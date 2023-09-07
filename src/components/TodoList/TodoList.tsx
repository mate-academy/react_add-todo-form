import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { CombinedTodo } from '../../types';

type Props = {
  todos: CombinedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);

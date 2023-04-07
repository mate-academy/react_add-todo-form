import React from 'react';
import { Todo } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="list-of-todo">
    {todos.map((todo) => (
      <TodoInfo
        todo={todo}
        key={todo.id}
      />
    ))}
  </section>
);

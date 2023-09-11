import React from 'react';
import { User } from '../../interfaces/user';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../interfaces/todo';

interface Props {
  todos: (Todo & { todoUser?: User })[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);

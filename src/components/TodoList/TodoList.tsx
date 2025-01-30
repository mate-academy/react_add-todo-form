import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoListProps } from './types';

export const TodoList: FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);

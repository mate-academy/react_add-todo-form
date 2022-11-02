import React from 'react';
import { TodoWithUser } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);

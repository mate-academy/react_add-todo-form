import React from 'react';
import { PreparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  ),
);

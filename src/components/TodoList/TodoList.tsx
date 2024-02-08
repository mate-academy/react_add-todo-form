import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[],
};

export const TodoList: React.FC<Props> = ({ todoList }) => (
  <section className="TodoList">
    {todoList.map((todo: Todo) => (
      <TodoInfo
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);

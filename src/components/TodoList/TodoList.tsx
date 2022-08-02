import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { MergeTodosUsers } from '../../type/types';

type Props = {
  todoList: MergeTodosUsers[];
};

export const TodoList: React.FC<Props> = ({ todoList = [] }) => {
  return (
    <section className="TodoList">
      {todoList.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};

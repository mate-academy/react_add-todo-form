import React from 'react';
import { PreparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todoList: PreparedTodo[],
}

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="TodoList">

      {todoList.map((todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          data-id={todo.id}
        />
      ))}

    </section>
  );
};

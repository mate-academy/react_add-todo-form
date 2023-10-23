import React from 'react';
import { FullTodo } from '../../types/FullTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: FullTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};

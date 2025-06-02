import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoInfoProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoInfoProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

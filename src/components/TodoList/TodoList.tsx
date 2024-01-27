import React from 'react';
import { Todo } from '../../Type/todos';
import { TodoInfo } from '../TodoInfo';

type TodosListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodosListProps> = ({ todos }) => {
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

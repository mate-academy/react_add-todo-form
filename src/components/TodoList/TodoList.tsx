import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../Types/TodoWithUser';

type TodosListProps = {
  todos: TodoWithUser[],
};

export const TodoList : React.FC<TodosListProps> = (
  { todos },
) => {
  return (
    <section className="TodoList">
      { todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}

    </section>
  );
};

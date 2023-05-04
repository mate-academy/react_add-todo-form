import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  onTodoDelete,
}) => {
  // eslint-disable-next-line no-console
  console.log('TodoList is rendering');

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          onDelete={() => onTodoDelete(todo.id)}
        />
      ))}
    </section>
  );
});

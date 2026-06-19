import { FC } from 'react';
import type { Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  todoComponent?: React.ComponentType<{ todo: Todo }>;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  todoComponent: TodoComponent,
}) => {
  if (!TodoComponent) {
    return <section className="TodoList">{todos}</section>;
  }

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

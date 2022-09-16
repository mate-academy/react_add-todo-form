import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => void;
  onTodoUpdate: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoDelete,
  onTodoUpdate,
}) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        todo={todo}
        onDelete={() => onTodoDelete(todo.id)}
        onUpdate={onTodoUpdate}
      />
    ))}
  </section>
);

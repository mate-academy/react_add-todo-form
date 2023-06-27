import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  onTodosDeleted: (todoID: number) => void,
  // onTodosUpdated: (todoToUpdate: Todo) => void
};

export const TodoList: React.FC<Props> = ({ todos, onTodosDeleted }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        onTodoDeleted={onTodosDeleted}
        // onTodoUpdate={onTodosUpdated}
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);

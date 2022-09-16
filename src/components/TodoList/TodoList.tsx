import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onTodoDelete }) => (
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

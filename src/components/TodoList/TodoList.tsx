import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[]
  deleteTodo: (idTodo: number) => void
  toggleTodoCompletion: (idTodo: number) => void
}
export const TodoList: React.FC<Props> = ({
  deleteTodo,
  todos,
  toggleTodoCompletion,
}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodoCompletion={toggleTodoCompletion}
        />
      ))}
    </section>
  );
};

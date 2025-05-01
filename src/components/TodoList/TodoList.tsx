import { TodoInfo } from '../TodoInfo';
import React from 'react';
import { getUserById } from '../../services/user';
import { CompletedTodo, Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => {
        const user = getUserById(todo.userId) || null;
        const completedTodo: CompletedTodo = {
          ...todo,
          user,
        };

        return <TodoInfo key={todo.id} todo={completedTodo} />;
      })}
    </section>
  );
};

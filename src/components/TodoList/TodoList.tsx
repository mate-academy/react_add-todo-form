import React from 'react';
import { CompletedTodo, Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { getUserById } from '../../services/user';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = getUserById(todo.userId);
        const completedTodo: CompletedTodo = {
          ...todo,
          user,
        };

        return <TodoInfo key={todo.id} todo={completedTodo} />;
      })}
    </section>
  );
};

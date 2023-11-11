import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/types';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        const { user } = todo;

        if (!user) {
          return null;
        }

        return (
          <React.Fragment key={todo.id}>
            <TodoInfo todo={todo} />
          </React.Fragment>
        );
      })}
    </section>
  );
};

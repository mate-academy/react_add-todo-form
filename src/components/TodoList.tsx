import React from 'react';
import { Todo } from './Todo';
import { TodoInfo } from './TodoInfo';

export type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    <div>
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          userId={todo.userId}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      ))}
    </div>
  </>
);

import React from 'react';

import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
// import todosFromServer from '../../api/todos';

interface Props {
  // todos: any[];
  todos: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    user: User;
  }[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {/* {todos.map((todo: any) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))} */}
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

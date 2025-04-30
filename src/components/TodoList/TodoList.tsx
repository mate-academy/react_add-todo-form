import React from 'react';
import { CompletedTodo, Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
// import { User } from '../../types/User';
import { getUserById } from '../../services/user';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  // const completedTodos: CompletedTodo[] = todos
  //   .map(todo => {
  //     const user = getUserById(todo.userId);
  //     if (!user) return null;

  //     return { ...todo, user };
  //   })
  //   .filter(Boolean) as CompletedTodo[];

  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = getUserById(todo.userId);
        const completedTodo: CompletedTodo = {
          ...todo,
          user,
        };

        return <TodoInfo key={todo.id} todo={completedTodo} user={user} />;
      })}
      {/* {completedTodos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} user={todo.user} />
      ))} */}
    </section>
  );
};

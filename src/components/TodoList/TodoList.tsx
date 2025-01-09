import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { getUserById } from '../../serveses/user';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todos: Todo[];
  users: User[];
};
export const TodoList: React.FC<Props> = ({ todos, users }) => {
  const completedTodos = todos.map(todo => {
    const user = getUserById(users, todo.userId);

    if (user) {
      return {
        ...todo,
        user,
      };
    }

    return todo;
  });

  return (
    <section className="TodoList">
      {completedTodos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};

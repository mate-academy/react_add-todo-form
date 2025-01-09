import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { getUserById } from '../../serveses/user';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todos: Todo[];
  users: User[];
};
export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = getUserById(users, todo.userId);

        return user && <TodoInfo todo={todo} key={todo.id} user={user} />;
      })}
    </section>
  );
};

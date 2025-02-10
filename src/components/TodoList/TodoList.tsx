import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoNewInfo } from '../TodoInfo/TodoNewInfo';

interface Todos {
  id?: number;
  title: string;
  completed?: boolean;
  userId: number;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  todos: Todos[];
  users: Users[];
  isClicked: boolean;
  userId: number;
  info: string;
}

export const TodoList: React.FC<Props> = ({
  todos,
  users,
  isClicked,
  userId,
  info,
}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} users={users} todo={todo} />
      ))}

      {isClicked && <TodoNewInfo userId={userId} text={info} users={users} />}
    </section>
  );
};

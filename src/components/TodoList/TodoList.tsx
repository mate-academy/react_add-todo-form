import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Users {
  id: number,
  name: string,
  username: string,
  email: string,
}
interface Lists {
  id: number,
  title: string,
  completed: boolean,
  userId: Users | undefined,
}

type Props = {
  todolist: Lists[],
};

export const TodoList: React.FC<Props> = ({ todolist }) => {
  return (
    <section className="TodoList">
      {todolist.map(list => (
        <TodoInfo key={list.id} todo={list} />
      ))}
    </section>
  );
};

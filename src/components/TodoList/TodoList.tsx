import React from 'react';
import { ToDo } from '../../App';
import { TodoInfo } from '../TodoInfo';
import users from '../../api/users';

type Props = {
  todos: ToDo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <TodoInfo
          key={item.id}
          todo={{ ...item, user: users.find(user => user.id === item.userId) }}
        />
      ))}
    </section>
  );
};

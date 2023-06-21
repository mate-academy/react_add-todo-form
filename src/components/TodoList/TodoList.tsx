import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import usersFromServer from '../../api/users';
import { TodoListProps } from './type';
import { User } from '../../interfaces';

export const TodoList: React.FC<TodoListProps> = React.memo(({ todoList }) => {
  return (
    <section className="TodoList">
      {todoList.map(todoItem => {
        const userInfo = usersFromServer
          .find(item => item.id === todoItem.userId) as User;

        return (
          <TodoInfo
            todo={todoItem}
            key={todoItem.id}
            user={userInfo}
          />
        );
      })}
    </section>
  );
});

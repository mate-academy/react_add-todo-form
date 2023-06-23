import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import usersFromServer from '../../api/users';
import { Todo, User } from '../../interfaces';

export type TodoListProps = {
  todoList: Todo[];
  users: User[];
};
export const TodoList: React.FC<TodoListProps> = React.memo(({ todoList }) => {
  return (
    <section className="TodoList">
      {todoList.map(todoItem => {
        const userInfo = usersFromServer
          .find(item => item.id === todoItem.userId);

        if (!userInfo) {
          throw new Error('userInfo is undefined');
        }

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

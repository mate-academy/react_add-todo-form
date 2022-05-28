import React from 'react';
import { Todo } from '../Types';
import UserInfo from '../UserInfo/UserInfo';
import TodoInfo from '../TodoInfo/TodoInfo';
import '../style/ToDoListStyles.scss';

type Props = {
  preparedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <div className="todo-list">
      {
        preparedTodos.map(todoItem => {
          if (todoItem.userInfo) {
            const { name, email, username } = todoItem.userInfo;
            const { userId, title, completed } = todoItem;

            return (
              <div className="todo-list__items" key={todoItem.id}>
                <UserInfo
                  name={name}
                  email={email}
                  username={username}
                />
                <TodoInfo
                  userId={userId}
                  title={title}
                  completed={completed}
                />
              </div>
            );
          }

          return null;
        })
      }
    </div>
  );
};

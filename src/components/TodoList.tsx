import React from 'react';
import './TodoList.scss';

import { Todo } from '../interface/Todo';
import { UserInfo } from './UserInfo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todosForTodoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todosForTodoList }) => (
  <>
    {todosForTodoList.map((todo) => (
      <div
        className="user"
        key={todo.id}
      >
        {todo.user && (
          <div className="user-info">
            <UserInfo
              name={todo.user.name}
              email={todo.user.email}
            />
          </div>
        )}
        <br />
        <div className="todo-info">
          <TodoInfo
            title={todo.title}
            completed={todo.completed}
          />
        </div>
      </div>
    ))}
  </>
);

import React from 'react';
import { PreparedTodosType } from '../../types/PreparedTodosType';
import TodoInfo from '../TodoInfo/TodoInfo';
import UserInfo from '../UserInfo/UserInfo';
import './TodoList.scss';

interface Props {
  todos: PreparedTodosType[];
}

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="TodoList">
      {
        todos.map(todoItem => (
          <div
            key={todoItem.id}
            className="item"
          >
            <TodoInfo item={todoItem} />
            {todoItem.user && (
              <UserInfo user={todoItem.user} />
            )}
          </div>
        ))
      }
    </div>
  );
};

export default TodoList;

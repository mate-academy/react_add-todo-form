import React from 'react';
import { PreparedTodo } from '../../app.typedef';
import { TodoInfo } from '../TodoInfo';

type Props = {
  preparedTodos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul className="todoList">
      {preparedTodos.map((todo: PreparedTodo) => {
        return (
          <li key={todo.id} className="todoList_item">
            <TodoInfo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};

import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
// import './TodoList.scss';

type Props = {
  preparedTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul className="todoList">
      {preparedTodos.map(preparedTodo => (
        <TodoInfo
          todo={preparedTodo}
          key={preparedTodo.id}
        />
      ))}
    </ul>
  );
};

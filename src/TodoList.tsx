import React from 'react';
import { TodoInfo } from './TodoInfo';
import './TodoList.css';
import { Todo } from './Types/Todo';

type Props = {
  todoses: Todo[]
};

export const TodoList: React.FC<Props> = ({ todoses }) => (
  <div className="todo-fields">
    {todoses.map(todo => (
      <div className="todo" key={todo.id}>
        <TodoInfo todo={todo} />
      </div>
    ))}
  </div>
);

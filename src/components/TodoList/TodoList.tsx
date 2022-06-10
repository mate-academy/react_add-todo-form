import React from 'react';
import { PreparedTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todosBase: PreparedTodo[],
};

export const TodoList: React.FC<Props> = ({ todosBase }) => (
  <div>
    {todosBase.map(todo => (
      <React.Fragment key={todo.id}>
        <TodoInfo todo={todo} />
      </React.Fragment>
    ))}
  </div>
);

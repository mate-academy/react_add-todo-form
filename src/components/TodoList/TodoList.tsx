import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

import { Todo } from '../../type/Todo';

type Props = {
  data: Todo[]
};

const TodoList: React.FC<Props> = ({ data }) => {
  return (
    <>
      <p className="App__todoList">Todo List</p>
      <ul>
        {data.map(todo => (
          <li key={todo.id} className="TodoItem">
            <TodoItem todoInfo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;

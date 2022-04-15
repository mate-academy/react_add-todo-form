import React from 'react';
import { Todo } from '../types';
import TodoInfo from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
    </div>
  );
};

export default TodoList;

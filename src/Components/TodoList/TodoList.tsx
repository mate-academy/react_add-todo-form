import React from 'react';
import { TodoCard } from '../TodoCard/TodoCard';
import { Todo } from '../Types/Types';
import './TodoList.scss';

type Props = {
  visibleTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <ul className="list">
      {visibleTodos.map(todo => <TodoCard todo={todo} key={todo.id} />)}
    </ul>
  );
};

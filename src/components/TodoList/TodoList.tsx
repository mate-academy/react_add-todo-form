import React from 'react';
import { Todos } from '../../react-app-env';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.scss';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map(item => (
        <TodoItem todo={item} key={item.id} />
      ))}
    </ul>
  );
};

import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { ExpandedTodo } from '../../types/ExpandedTodo';

type Props = {
  todos: ExpandedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todoItem => (<TodoInfo key={todoItem.id} todo={todoItem} />))}
    </section>
  );
};

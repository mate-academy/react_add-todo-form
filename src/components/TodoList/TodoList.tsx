import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todoList: Todo[];
}


export const TodoList : React.FC<TodoListProps> = ({ todoList } ) => (
  <>
    {todoList.map((todoItem) => (
      <TodoInfo key={todoItem.id} todo={todoItem} />
    ))}
  </>
);




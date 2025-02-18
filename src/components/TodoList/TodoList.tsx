import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
}


export const TodoList : React.FC<TodoListProps> = ({ todos } ) => (
  <>
    {todos.map((todoItem) => (
      <TodoInfo key={todoItem.id} todo={todoItem} />
    ))}
  </>
);




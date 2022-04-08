import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  userLink?: {
    name: string;
    email: string;
  }
}

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

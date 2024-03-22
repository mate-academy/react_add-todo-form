import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo, TodoFromServer, UserFromServer } from './types';

export const getUserById = (userId: number) => {
  return usersFromServer.find((userFromServer: UserFromServer) => {
    return userFromServer.id === userId;
  })
}

const getTodos = (): Todo[] => {
  return todosFromServer.map((todo: TodoFromServer)=> {
    return {
      ...todo,
      user: getUserById(todo.userId),
    };
  });
};

export const App = () => {
  const [todos , setTodos] = useState<Todo[]>(getTodos());
  const [count, setCount] = useState(0);

  const addNewToDo = (todo: Todo): void => {
    setTodos(prevTodos => [ ...prevTodos, todo ]);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        key={count}
        onAdd={addNewToDo}
        todos={todos}
      />

      <TodoList todos={todos}/>

    </div>
  );
};

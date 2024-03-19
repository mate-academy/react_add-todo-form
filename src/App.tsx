import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { ToDo, ToDoFromServer, UserFromServer } from './types';

const getToDoArray = (): ToDo[] => {
  return todosFromServer.map((todo: ToDoFromServer)=> {
    return {
      ...todo,
      user: usersFromServer.find((userFromServer: UserFromServer) => {
        return userFromServer.id === todo.userId;
      })
    }
  }) as ToDo[]
}

export const App = () => {
  const [toDoArray , setToDoArray] = useState<ToDo[]>(getToDoArray());
  const [count, setCount] = useState(0);

  const addNewToDo = (todo: ToDo): void => {
    setToDoArray(array => [ ...array, todo ])
    setCount(c => c + 1);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        key={count}
        onAdd={addNewToDo}
        todos={toDoArray}
        users={usersFromServer}
      />

      <TodoList todos={toDoArray}/>

    </div>
  );
};

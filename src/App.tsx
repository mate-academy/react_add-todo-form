import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { ToDo } from './type/ToDo';
import { TodoList } from './components/TodoList';
import { getNewIdToDo } from './services/getNewIdToDo';
import { TodoForm } from './components/TodoForm';

const initialTodos: ToDo[] = [...todosFromServer];

export const App = () => {
  const [usersArray, setUsersArray] = useState<ToDo[]>(initialTodos);

  const addToDo = ({ id, ...data }: ToDo) => {
    const newUser = {
      id: getNewIdToDo(usersArray),
      ...data,
    };

    return setUsersArray(currentUserArray => [...currentUserArray, newUser]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addToDo} todos={usersArray} />

      <TodoList todos={usersArray} />
    </div>
  );
};

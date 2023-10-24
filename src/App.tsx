import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './components/services/getUserById';

const todosWithUsers = todosFromServer.map(todo => (
  { ...todo, user: getUserById(todo.userId) }
));

export const App = () => {
  const [todos, setToDos] = useState<ToDo[]>(todosWithUsers);

  const addToDo = (todo: ToDo) => {
    setToDos(prevToDos => [...prevToDos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addToDo={addToDo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};

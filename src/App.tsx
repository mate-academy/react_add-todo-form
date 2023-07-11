import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { NewToDo } from './components/NewToDo/NewToDo';

import { ToDo } from './services/interfaces';
import { getUserById } from './services/user';

import todosFromServer from './api/todos';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [updatedTodos, setUpdatedTodos] = useState(todos);

  function addNewTodo(newTodo: ToDo) {
    setUpdatedTodos(currentTodos => [...currentTodos, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewToDo onSubmit={(toDo: ToDo) => addNewTodo(toDo)} />
      <TodoList todos={updatedTodos} />

    </div>
  );
};

import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/totos';
import { Forma } from './components/Forma/forma';
import { getUserById } from './services/functions';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>(todos);

  function addNewTodo(newTodo: Todo) {
    setAllTodos(prevTodos => [...prevTodos, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Forma todos={allTodos} addNewTodo={addNewTodo} />
      <TodoList todos={allTodos} />
    </div>
  );
};

import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './components/types/Todos';
import { Forma } from './components/form/form';
import { getUserById } from './components/function/function';

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

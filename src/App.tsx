import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const addNewTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addNewTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};

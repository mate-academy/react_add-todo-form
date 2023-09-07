import { useState } from 'react';
import './App.scss';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import { TodoType } from './types';

import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<TodoType[]>(todosFromServer);

  const handleAddTodo = (todo: TodoType) => {
    setTodos(prev => [...prev, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addTodo={handleAddTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};

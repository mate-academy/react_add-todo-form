import { useState } from 'react';
import { Todo, PreparedTodo } from './types';
import { findUserById, getPreparedTodos } from './services/apiService';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import './App.scss';

const preparedTodos = getPreparedTodos();

export const App = () => {
  const [todos, setTodos] = useState<PreparedTodo[]>(preparedTodos);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const user = findUserById(newTodo.userId);

    const newPreparedTodo: PreparedTodo = {
      ...newTodo,
      id: newId,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newPreparedTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

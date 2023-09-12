import { useState } from 'react';
import { Todo } from './types';
import { findUserById, getPreparedTodos } from './services/apiService';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import './App.scss';

const preparedTodos = getPreparedTodos();

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const user = findUserById(newTodo.userId);

    const newTodoWithUser: Todo = {
      ...newTodo,
      id: newId,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodoWithUser]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

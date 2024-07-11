import './App.scss';

import users from './api/users';
import todosData from './api/todos';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

const initialTodos = todosData.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const todoToadd: Todo = {
      ...newTodo,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, todoToadd]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodoForm/NewTodo';
import { getUserById } from './services/userService';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAdd = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <NewTodoForm users={usersFromServer} onAdd={handleAdd} />
      <TodoList todos={todos} />
    </div>
  );
};

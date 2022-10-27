import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './react-app-env';
import { TodoList } from './components/TodoList';
import { getUserById } from './utils/getUserById';
import { TodoForm } from './components/TodoForm';

const initialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  const addNewTodo = (newTodo: TodoWithUser) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addNewTodo={addNewTodo} />

      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

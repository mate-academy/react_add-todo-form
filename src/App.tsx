import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { User } from './types/User';
import { Todos } from './types/Todos';

function getNewTodoId(todos: Todos[]) {
  const maxId = Math.max(...todos.map((todo) => todo.id));

  return maxId + 1;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

export const todos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [updateTodos, setUpdateTodos] = useState<Todos[]>(todos);

  const addNewTodo = (todo: Todos) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(updateTodos),
    };

    setUpdateTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addTodo={addNewTodo} />

      <TodoList todos={updateTodos} />
    </div>
  );
};

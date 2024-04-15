import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

export const getNewTodoId = (array: Todo[]) => {
  const maxId = Math.max(...array.map(item => item.id));

  return maxId + 1;
};

const getUserById = (userId: number): User | null => {
  const result = usersFromServer.find(user => user.id === userId);

  return result || null;
};

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState(initialTodos);

  const todoAdd = (newTodo: Todo) =>
    setTodos(currentTodos => [...currentTodos, newTodo]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={users}
        todoAdd={todoAdd}
        newTodoId={getNewTodoId(todos)}
      />

      <TodoList todos={todos} />
    </div>
  );
};

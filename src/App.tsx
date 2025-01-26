import './App.scss';

import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { User } from './types/User';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }))
  .filter(todo => todo.user !== null);

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodos = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        onSubmit={addTodos}
        users={usersFromServer}
        getUserById={getUserById}
      />

      <TodoList todos={todos} />
    </div>
  );
};

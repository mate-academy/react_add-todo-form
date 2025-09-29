import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import { Todo } from './types/Todo';
import { ExtendedTodo } from './types/ExtendedTodo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

function getPreparedTodos(todos: Todo[], users: User[]): ExtendedTodo[] {
  return todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => todo.userId === user.id),
  }));
}

export const App = () => {
  const [todos, setTodos] = useState<ExtendedTodo[]>(
    getPreparedTodos(todosFromServer, usersFromServer),
  );

  function handleAddTodo(todo: Todo) {
    const extendedTodo: ExtendedTodo = {
      ...todo,
      user: usersFromServer.find((user: User) => todo.userId === user.id),
    };

    setTodos(prevTodos => [...prevTodos, extendedTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        maxTodoId={Math.max(0, ...todos.map(todo => todo.id))}
        onAdd={handleAddTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};

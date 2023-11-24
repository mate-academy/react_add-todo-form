import { useState } from 'react';
import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/Types/Todo';

function getUser(userId: number) {
  return usersFromServer.find(user => userId === user.id) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => {
      return todo.id ? todo.id : 0;
    }),
  );

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
      user: getUser(todo.userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};

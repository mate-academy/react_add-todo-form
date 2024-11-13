import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import { TodoForm } from './components/TodoForm/TodoForm';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
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

import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types/Todo';
import { getNewTodoId } from './helpers/GetNewTodoId';
import { getUserById } from './helpers/GetUserById';

export const initialTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState(initialTodos);

  const todoAdd = (newTodo: Todo) => setTodos(
    currentTodos => [...currentTodos, newTodo],
  );

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

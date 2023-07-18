import { FC, useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { getUserById } from './getUserById';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  };
});

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const addNewTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onAddTodo={addNewTodo} />

      <TodoList preparedTodos={todos} />

    </div>
  );
};

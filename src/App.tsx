import './App.scss';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo } from './types/PreparedTodo';

import { fakeUser } from './utils';

const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => todo.userId === id) ?? fakeUser,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);

  const addTodo = (todo: PreparedTodo): void => {
    setTodos((prevState) => [...prevState, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        todos={todos}
        addTodo={addTodo}
        users={usersFromServer}
      />
      <TodoList todos={todos} />

    </div>
  );
};

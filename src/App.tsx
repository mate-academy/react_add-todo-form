import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './utils';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodoForm } from './components/NewTodoForm';

const todoRoster = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todoRoster);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodoForm
        todos={todos}
        users={usersFromServer}
        handleAdd={newTodo => {
          setTodos(prevTodos => [...prevTodos, newTodo]);
        }}
      />

      <TodoList todos={todos} />
    </div>
  );
};

import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { User, Todo, PreparedTodo } from './react-app-env';
import { TodoList } from './components/TodoList';

const getPreparedTodos = (user: User[], todosInp: Todo[]): PreparedTodo[] => {
  return todosInp.map((todo: Todo) => ({
    ...todo,
    user: user.find((person: User) => (person.id === todo.userId)) || null,
  }));
};

const preparedTodos: PreparedTodo[] = getPreparedTodos(users, todos);

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        <TodoList prepTodos={preparedTodos} />
      </p>
    </div>
  );
};

export default App;

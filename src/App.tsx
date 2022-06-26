import React from 'react';
import './App.scss';
import { PreparedTodo } from './types';
import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

const preparedTodos: PreparedTodo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => (
  <div className="App">
    <TodoList preparedTodos={preparedTodos} />
  </div>
);

export default App;

import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';

const getTodosWithUsers = (todos, users) => (
  todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }))
)

const App = () => {
  const preparedTodos = getTodosWithUsers(todos, users);

  return (
    <>
      <Header usersCount={users.length} todosCount={todos.length} />
      <TodoList todos={preparedTodos} />
    </>
  );
}

export default App;

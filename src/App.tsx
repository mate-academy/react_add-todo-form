import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const prepTodoList = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoList users={usersFromServer} todoList={prepTodoList} />
    </div>
  );
};

export default App;

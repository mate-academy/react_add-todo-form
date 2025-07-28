import './App.scss';
import { TodoInfo } from './components/TodoInfo';
import { Todo, TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  function createNewTodo(todo: Todo) {
    setTodos([...todos, todo]);
  }

  return (
    <div className="App">
      <TodoInfo
        todos={todos}
        users={usersFromServer}
        createNewTodo={createNewTodo}
      />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};

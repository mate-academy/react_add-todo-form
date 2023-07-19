import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUserByid } from './services/getUser';

const todoList: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserByid(usersFromServer, todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todoList);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        todos={todos}
        setTodos={setTodos}
      />

      <TodoList todos={todos} />
    </div>
  );
};

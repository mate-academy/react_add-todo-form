import { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import { Todo } from './react-app-env';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const maxId = todos.reduce((max, todo) => {
    return todo.id > max ? todo.id : max;
  }, 0);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        onAdd={addTodo}
        maxId={maxId}
      />

      <TodoList todos={todos} />
    </div>
  );
};

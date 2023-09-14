import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map((todo) => {
      const userToAdd = usersFromServer.find((user) => user.id === todo.userId);

      const todoWithUser: Todo = {
        ...todo,
        user: userToAdd || null,
      };

      return todoWithUser;
    }),
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        users={usersFromServer}
        todos={todos}
        onAddTodo={(todo) => {
          setTodos((prevTodo) => [...prevTodo, todo]);
        }}
      />
      <TodoList todos={todos} />
    </div>
  );
};

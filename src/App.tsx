import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { PreparedTodo, Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type Prepare = (todos: Todo[], users: User[]) => PreparedTodo[];

const prepareTodos: Prepare = (todos, users) => {
  const prepared = [...todos];

  prepared.forEach((todo) => {
    Object.defineProperty(todo, 'user', {
      value: users.find((user) => user.id === todo.userId),
    });
  });

  return prepared as PreparedTodo[];
};

export const App = () => {
  const [todos, setTodos]
    = useState(prepareTodos(todosFromServer, usersFromServer));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        todos={todos}
        createNewTodo={(newTodo: PreparedTodo) => {
          setTodos(prevState => {
            return [
              ...prevState,
              newTodo,
            ];
          });
        }}
      />

      <TodoList todos={todos} />
    </div>
  );
};

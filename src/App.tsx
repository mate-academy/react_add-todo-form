import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { NewTodo } from './components/NewTodo';

const getUserById = (id: number) => {
  const foundUser = usersFromServer.find(user => user.id === id);

  if (!foundUser) {
    throw new Error(`User with id ${id} not found`);
  }

  return foundUser;
};

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function newTodoId() {
    return Math.max(...todos.map(todo => todo.id), 0) + 1;
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo
        onAddTodo={todo => {
          setTodos(prevTodos => [
            ...prevTodos,
            {
              id: newTodoId(),
              title: todo.title,
              completed: false,
              userId: todo.userId,
              user: getUserById(todo.userId),
            },
          ]);
        }}
        users={usersFromServer}
      />
      <TodoList todos={todos} />
    </div>
  );
};

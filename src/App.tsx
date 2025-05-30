import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoForm } from './components/TodoForm';

import { Todo } from './entities/todo';
import { TodoList } from './components/TodoList';

const todosWithUser: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    user: user || null,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodo => {
      const maxId =
        prevTodo.length > 0 ? Math.max(...prevTodo.map(t => t.id)) : 0;

      const todoWithId = {
        ...newTodo,
        id: maxId + 1,
      };

      return [...prevTodo, todoWithId];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};

import './App.scss';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

type TodoNew = {
  title: string;
  userId: number;
};

export const App = () => {
  const [todos, setTodos] = useState(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const handleAddTodo = (newTodo: TodoNew) => {
    setTodos(prevTodos => {
      const maxId = prevTodos.length
        ? Math.max(...prevTodos.map(todo => todo.id))
        : 0;

      return [
        ...prevTodos,
        {
          ...newTodo,
          id: maxId + 1,
          completed: false,
          user: getUserById(newTodo.userId),
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

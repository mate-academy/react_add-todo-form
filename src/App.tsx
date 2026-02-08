import './App.scss';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoWithUser } from './components/types/TodoWithUser';

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

  const handleAddTodo = ({ title, userId }: TodoNew) => {
    const maxId = todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );

    const newTodo: TodoWithUser = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={handleAddTodo} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};

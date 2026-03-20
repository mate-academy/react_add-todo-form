import './App.scss';
import { Todo } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [users] = useState(usersFromServer);

  // описові змінні без конфлікту
  const todosFromServerWithUsers: Todo[] = todosFromServer.map(todoItem => ({
    ...todoItem,
    user: usersFromServer.find(todoUser => todoUser.id === todoItem.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(todosFromServerWithUsers);

  const addTodo = (title: string, userId: number) => {
    // описова змінна для max id
    const newId = todos.length
      ? Math.max(...todos.map(existingTodo => existingTodo.id)) + 1
      : 1;

    const selectedUser = users.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: newId,
      title,
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={users} onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

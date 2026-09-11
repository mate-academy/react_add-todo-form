import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './sourse/User';
import { Todo } from './sourse/Todo';
import { MemoAddTodoForm } from './components/AddTodoForm';

type TodoWithUser = Todo & { user: User | null };

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(
    todosFromServer.map((todo: Todo) => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const AddTodoHandler = (title: string, userId: number) => {
    const newTodo: TodoWithUser = {
      id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <MemoAddTodoForm users={usersFromServer} onSubmit={AddTodoHandler} />

      <TodoList todos={todos} />
    </div>
  );
};

import { useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { Todo, TodoWithUser } from './types';
import { getUserById } from './utils';

const todosWithUser = todosFromServer.map((todo: Todo): TodoWithUser => {
  const userInfo = getUserById(todo.userId);

  if (!userInfo) {
    throw new Error('User not found');
  }

  return {
    ...todo,
    user: { ...userInfo },
  };
});

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);

  const addTodo = (todo: TodoWithUser) => {
    setTodos(prevTodos => {
      return [...prevTodos, todo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { Todo, User } from './utils/types';
import { getUserById, getMaxTodoId } from './utils/helpers';

export const App: React.FC = () => {
  const users: User[] = usersFromServer;
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const addTodo = ({ title, userId }: Omit<Todo, 'id' | 'completed'>) => {
    const newTodo: Todo = {
      id: getMaxTodoId(todos) + 1,
      title,
      completed: false,
      userId,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add Todo Form</h1>

      <AddTodoForm users={users} addTodo={addTodo} />

      <TodoList todos={todosWithUsers} />
    </div>
  );
};

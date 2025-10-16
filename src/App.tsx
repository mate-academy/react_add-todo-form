import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoAgregate } from './domains/TodoAgregate';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { User } from './domains/User';
import { useState } from 'react';

export type TodoDraft = {
  title: string;
  userId: number;
};

export const App = () => {
  const [todos, setTodos] = useState<TodoAgregate[]>(() =>
    todosFromServer.map(todo => {
      const user = usersFromServer.find(
        userItem => userItem.id === todo.userId,
      ) as User;

      return {
        ...todo,
        user,
      };
    }),
  );

  const handleAddTodo = ({ title, userId }: TodoDraft) => {
    const nextId =
      todos.length > 0
        ? Math.max(...todos.map(todoItem => todoItem.id)) + 1
        : 1;

    const user = usersFromServer.find(
      userItem => userItem.id === userId,
    ) as User;

    const newTodo: TodoAgregate = {
      id: nextId,
      title,
      completed: false,
      userId,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onAdd={handleAddTodo} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};

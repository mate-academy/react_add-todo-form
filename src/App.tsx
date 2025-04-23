import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { Todo, TodoWithUser } from './types/todo';

import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const preparedParams: TodoWithUser[] = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prev: Todo[]) => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        users={usersFromServer}
        todos={todos}
        onAddTodo={handleAddTodo}
      />
      <TodoList todos={preparedParams} />
    </div>
  );
};

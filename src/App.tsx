import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodo } from './components/AddTodo';
import { Todo } from './types/todo';

const todosWithUser = todosFromServer.map((todo) => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    setTodos(prev => {
      const newId = Math.max(...prev.map((todo) => todo.id)) + 1;

      return [
        ...prev,
        {
          id: newId,
          ...newTodo,
          user: usersFromServer
            .find(user => user.id === newTodo.userId) || null,
        }];
    });
  };

  return (
    <div className="App">
      <AddTodo users={usersFromServer} onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

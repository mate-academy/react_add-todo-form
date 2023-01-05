import React, { useCallback, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

export const App: React.FC<{}> = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleSubmit = useCallback((
    user: number,
    title: string,
    completed: boolean,
  ) => {
    setTodos(prev => {
      const newTodo = {
        id: Math.max(...prev.map(item => item.id)) + 1,
        title,
        userId: user,
        completed,
      };

      return ([
        ...prev,
        newTodo,
      ]);
    });
  }, []);

  return (
    <div className="App">

      <div className="container">
        <AddTodoForm users={usersFromServer} handleSubmit={handleSubmit} />

        <hr className="App__break" />

        <TodoList todos={todos.map(todo => ({
          ...todo,
          user: usersFromServer.find(item => item.id === todo.userId) || null,
        }))}
        />
      </div>

    </div>
  );
};

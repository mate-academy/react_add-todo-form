import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const prepairedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(prepairedTodos);

  const addTodoHandler = (newTodo: Omit<Todo, 'id'>) => {
    const todoIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todoIds);

    const preparedTodo = {
      ...newTodo,
      id: maxTodoId + 1,
    };

    setTodos((prevState) => [...prevState, preparedTodo]);
  };

  // console.log(todos);

  return (
    <div className="App">
      <h1>Add good form</h1>

      <AddTodoForm
        addTodoHandler={addTodoHandler}
      />
      <TodoList todos={todos} />
    </div>
  );
};

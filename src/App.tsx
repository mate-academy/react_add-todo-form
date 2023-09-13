import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDoWithUser } from './types';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form/Form';

const preparedToDos: ToDoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<ToDoWithUser[]>(preparedToDos);

  const addTodoHandler = (newTodo: Omit<ToDoWithUser, 'id'>) => {
    const todosIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todosIds);

    const preparedTodo = {
      ...newTodo,
      id: maxTodoId + 1,
    };

    setTodos((prevTodos) => [...prevTodos, preparedTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form addTodoHandler={addTodoHandler} />

      <TodoList todos={todos} />
    </div>
  );
};

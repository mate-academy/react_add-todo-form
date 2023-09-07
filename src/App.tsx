import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { PreparedTodo } from './types';

import { TodoAddForm } from './components/TodoAddForm';
import { TodoList } from './components/TodoList';

const preparedTodoTasks: PreparedTodo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => todo.userId === id) || null;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(preparedTodoTasks);

  const addTask = (newTask: PreparedTodo): void => {
    setTodos((prevState) => [...prevState, newTask]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoAddForm
        users={usersFromServer}
        todos={todos}
        addTask={addTask}
      />
      <TodoList todos={todos} />
    </div>
  );
};

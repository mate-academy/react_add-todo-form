import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './servises/GetUserById';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todosList: Todo[]) {
  const maxId = Math.max(
    ...todosList.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const addNewTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(visibleTodos),
    };

    setVisibleTodos(currentTodos => [
      ...currentTodos,
      newTodo,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm usersList={usersFromServer} onAdd={addNewTodo} />
      <TodoList todos={visibleTodos} />
    </div>
  );
};

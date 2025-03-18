import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { ToDo } from './types/ToDo';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getTodoId } from './services/getTodoId';
import { getUserById } from './services/getUserById';

const todos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<ToDo[]>(todos);

  const addTodo = (todo: ToDo) => {
    const newTodo = {
      ...todo,
      id: getTodoId(todos),
      user: getUserById(todo.userId),
    };

    setVisibleTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm userOptions={usersFromServer} onAdd={addTodo} />

      <TodoList todos={visibleTodos} />
    </div>
  );
};

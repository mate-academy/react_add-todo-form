import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './services/user';
import { Todo } from './types/Todos';
import { useState } from 'react';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewId(copyTodos: Todo[]) {
  const maxId = +Math.max(...copyTodos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [copyTodos, setTodos] = useState(todos);
  const onAdd = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewId(copyTodos),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAdd={onAdd} />
      <TodoList todos={copyTodos} />
    </div>
  );
};

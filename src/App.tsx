import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './srvices/getUserById';

const todosList: Todo[] = todosFromServer.map(t => ({
  ...t,
  user: getUserById(t.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosList);

  const setId = () => {
    return Math.max(...todos.map(t => t.id)) + 1;
  };

  const addTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, { ...todo, id: setId() }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

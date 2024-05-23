import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/Todo';

export const App = () => {
  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todos, setTodos] = useState(initialTodos);
  const handleSubmit = (newTodo: Todo) => {
    const upDatedNewTodo = { ...newTodo };

    upDatedNewTodo.id = Math.max(...todos.map(todo => todo.id)) + 1;
    setTodos(prev => [...prev, upDatedNewTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onSubmit={handleSubmit} />

      <TodoList todos={todos} />
    </div>
  );
};

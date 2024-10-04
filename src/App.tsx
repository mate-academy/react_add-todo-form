import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { Todo } from './types';
import { getUserById } from './utils';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo setTodos={setTodos} />
      <TodoList todos={todos} />
    </div>
  );
};

import './App.scss';

import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo todos={todos} onTodos={setTodos} />

      <TodoList todos={todos} />
    </div>
  );
};

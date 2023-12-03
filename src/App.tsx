import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import Todo from './types/Todo';
import { TodoList } from './components/TodoList';
import { NewPost } from './components/NewPost';

export const App = () => {
  const { 0: todos, 1: setTodos } = useState<Todo[]>(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewPost setTodos={setTodos} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};

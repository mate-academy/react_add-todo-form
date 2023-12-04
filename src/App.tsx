import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import Todo from './types/Todo';
import { TodoList } from './components/TodoList';
import { NewPost } from './components/NewPost';
import getUserById from './utils/getUserById';

export const App = () => {
  const { 0: todos, 1: setTodos } = useState<Todo[]>(todosFromServer);

  const todosList: Todo[] = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewPost setTodos={setTodos} todos={todos} />

      <TodoList todos={todosList} />
    </div>
  );
};

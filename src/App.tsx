import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import { PostForm } from './components/PostForm/PostForm';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewId = () => {
  return Math.max(...initialTodos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewId(),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <PostForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

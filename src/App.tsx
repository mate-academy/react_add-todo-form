import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './services/User';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAdd = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <TodoForm onAdd={onAdd} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};

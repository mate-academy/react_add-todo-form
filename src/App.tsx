import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

import './App.scss';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => Math.max(...todos
  .map(todo => todo.id)) + 1;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />

    </div>
  );
};

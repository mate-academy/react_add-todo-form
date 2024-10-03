import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

export const intitalTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxID = Math.max(...todos.map(todo => todo.id));

  return maxID + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(intitalTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(cuurentTodos => [...cuurentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

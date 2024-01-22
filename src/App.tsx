import './App.scss';
import { useState } from 'react';
import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';
import { Todo } from './types/todo';

import todosFromServer from './api/todos';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

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

      <TodoInfo onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

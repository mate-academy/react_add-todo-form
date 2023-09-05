import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { getUserById } from './services/getUserById';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { Todo } from './types/Todo';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

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

      <NewTodo onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

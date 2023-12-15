import './App.scss';

import React, { useState } from 'react';
import { Todo } from './components/types/Todo';
import todosFromServer from './api/todos';
import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App: React.FC = () => {
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

export default App;

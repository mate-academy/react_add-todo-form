import { useState } from 'react';

import './App.scss';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
};

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

      <NewTodo onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

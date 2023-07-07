import './App.scss';
import { useState } from 'react';
import { Todo } from './types/Todo';

import { getUserById } from './services/user';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

// function getNewTodotId(todos: Todo[]) {
//   const maxId = Math.max(...todos.map(todo => todo.id));

//   return maxId + 1;
// }

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const getNewTodotId = () => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, {
      ...newTodo,
      id: getNewTodotId(),
    }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};

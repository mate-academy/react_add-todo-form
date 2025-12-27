import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/getUserId';
import { Todo } from './types/Todo';
import { useState } from 'react';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]): number => {
  if (todos.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

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

      <TodoList onSubmit={addTodo} todolist={todos} />
    </div>
  );
};

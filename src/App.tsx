import './App.scss';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { getUserById } from './services/getUserById';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  function getNewTodoId(todos: Todo[]) {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  }

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

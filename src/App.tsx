import { useState } from 'react';
import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const countMaxId: number = Math.max(...todos.map(todo => todo.id));

  const appendTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAddTodo={appendTodo} maxId={countMaxId} />

      <TodoList todos={todos} />
    </div>
  );
};

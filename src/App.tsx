import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';

import { Todo } from './types/todo';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/userId';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onSubmit={addTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};

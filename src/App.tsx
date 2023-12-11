import './App.scss';
import { useState } from 'react';
import { getUserById } from './services/user_service';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types/Todo';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
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

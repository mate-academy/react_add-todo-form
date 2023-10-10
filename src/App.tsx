import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAddTodo = (todo: Todo) => {
    setTodos(prevTodos => [
      ...prevTodos,
      todo,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={onAddTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};

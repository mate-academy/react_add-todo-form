import './App.scss';
import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';
import { useState } from 'react';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
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

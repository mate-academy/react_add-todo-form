import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './components/types/Todo';
import { getUserById } from './services/user';

const initialTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,

  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodo);

  const addTodo = (newTodos: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodos]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList
        todos={todos}
        onAdd={addTodo}
      />
    </div>
  );
};

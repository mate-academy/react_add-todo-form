import './App.scss';
import { useCallback, useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { filteredTodos, getMaxId } from './services/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(filteredTodos);

  const getPreparedTodos = useCallback((todo: Todo) => {
    setTodos(currentTodos => {
      const newTodo = {
        ...todo,
        id: getMaxId(currentTodos) + 1,
      };

      return [...currentTodos, newTodo];
    });
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={getPreparedTodos} />

      <TodoList todos={todos} />
    </div>
  );
};

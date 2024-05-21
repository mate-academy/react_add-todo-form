import './App.scss';
import { useCallback, useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { filteredTodos, getMaxId } from './services/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(filteredTodos);
  const maxId: number = getMaxId(todos) + 1;

  const getPreparedTodos = useCallback((todo: Todo) => {
    setTodos(currentTodos => currentTodos.concat(todo));
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={getPreparedTodos} newTodoId={maxId} />

      <TodoList OnTodos={todos} />
    </div>
  );
};

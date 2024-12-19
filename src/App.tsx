import React, { useCallback, useMemo, useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import './App.scss';
import { getMaxId } from './services/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import todosFromServer from './api/todos';
import { getUserBy } from './utils/getUserBy';
const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserBy(todo),
  };
});

type Props = {
  todos: Todo[];
};
export const App: React.FC<Props> = () => {
  // #region query
  const [query, setQuery] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // #endregion
  const [todos, setTodos] = useState(preparedTodos);
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => todo.title.includes(query));
  }, [query, todos]);

  const addTodo = useCallback((todo: Todo) => {
    setTodos(currentTodos => {
      const newTodo = {
        ...todo,
        id: getMaxId(currentTodos) + 1,
      };

      return [...currentTodos, newTodo];
    });
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  }, []);

  const updateTodo = useCallback((updatedTodo: Todo) => {
    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const index = newTodos.findIndex(todo => todo.id === updatedTodo.id);

      newTodos.splice(index, 1, updatedTodo);

      return newTodos;
    });
  }, []);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <div className="section py-5">
        <div className="columns is-mobile">
          <div className="column">
            <h1 className="title">Todos</h1>
            <div className="column">
              <input
                autoFocus
                type="text"
                placeholder="Search todo"
                className="input is-rounded"
                value={query}
                onChange={handleQueryChange}
              />
              <section className="TodoList">
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onDelete={deleteTodo}
                  onSelect={setSelectedTodo}
                />
              </section>
            </div>
          </div>
        </div>

        {selectedTodo ? (
          <TodoForm
            key={selectedTodo.id}
            todo={selectedTodo}
            onSubmit={updateTodo}
            onReset={() => setSelectedTodo(null)}
          />
        ) : (
          <TodoForm onSubmit={addTodo} />
        )}
      </div>
    </div>
  );
};

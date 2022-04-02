import './App.scss';
import {
  FC, memo, useCallback, useState,
} from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { PageNavbar } from './components/PageNavbar';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

export const App: FC = memo(
  () => {
    const [todos, setTodos] = useState(getTodos);

    const handleFormSubmission = useCallback((newTodo: Todo) => {
      setTodos((prevTodos) => (
        [...prevTodos, newTodo]
      ));
    }, []);

    return (
      <div className="App">
        <PageNavbar />

        <div
          className="App__content d-flex justify-content-between"
        >
          <div className="App__form">
            <TodoForm
              defaultOption="Choose a users..."
              lastTakenId={todos[todos.length - 1].todoId}
              onSubmit={handleFormSubmission}
            />
          </div>

          <TodoList todos={todos} />
        </div>
      </div>
    );
  },
);

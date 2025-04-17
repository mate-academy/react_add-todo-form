import './App.scss';
import { useState, useEffect, useRef } from 'react';
import { Todos } from './types/Todos';
// eslint-disable-next-line import/extensions
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type TodoFormError = {
  titleError?: string;
  selectError?: string;
};

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [formTitle, setFormTitle] = useState<string>('');
  const [formSelect, setFormSelect] = useState<number>(0);

  const [errors, setErrors] = useState<TodoFormError>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTodos(todosFromServer);
    setUsers(usersFromServer);
  }, []);

  const titleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(event.target.value);
    const { titleError, ...otherErrors } = errors;

    setErrors({ ...otherErrors });
  };

  const selectInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormSelect(+event.target.value);
    const { selectError, ...otherErrors } = errors;

    setErrors({ ...otherErrors });
  };

  const determineId = () => Math.max(0, ...todos.map(todo => todo.id)) + 1;

  const clearForm = () => {
    setErrors({});
    setFormTitle('');
    setFormSelect(0);
    inputRef.current?.focus();
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: TodoFormError = {};

    if (!formTitle.trim()) {
      newErrors.titleError = 'Please enter a title';
    }

    if (formSelect === 0) {
      newErrors.selectError = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    const newTodo: Todos = {
      id: determineId(),
      title: formTitle.trim(),
      completed: false,
      userId: formSelect,
    };

    setTodos(prev => [...prev, newTodo]);
    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={formTitle}
            placeholder="Enter a title"
            onChange={titleInput}
            ref={inputRef}
          />
          {errors.titleError && (
            <span className="error">{errors.titleError}</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={formSelect}
            onChange={selectInput}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.selectError && (
            <span className="error">{errors.selectError}</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={!formTitle.trim() || formSelect === 0}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};

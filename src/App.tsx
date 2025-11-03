import './App.scss';
import { useMemo, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type User = (typeof usersFromServer)[number];
type RawTodo = (typeof todosFromServer)[number];

export type Todo = Omit<RawTodo, 'userId'> & {
  userId: number;
  user: User;
};

export const App = () => {
  const initialTodos: Todo[] = useMemo(() => {
    return todosFromServer.map(todoItem => ({
      ...todoItem,
      user: usersFromServer.find(
        currentUser => currentUser.id === todoItem.userId,
      )!,
    }));
  }, []);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [errors, setErrors] = useState({ title: false, user: false });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserValid = selectedUserId !== '';

    if (!isTitleValid || !isUserValid) {
      setErrors({ title: !isTitleValid, user: !isUserValid });

      return;
    }

    const maxId = Math.max(0, ...todos.map(todoItem => todoItem.id));
    const user = usersFromServer.find(
      currentUser => currentUser.id === selectedUserId,
    )!;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: Number(selectedUserId),
      user,
    };

    setTodos(previousTodos => [...previousTodos, newTodo]);

    setTitle('');
    setSelectedUserId('');
    setErrors({ title: false, user: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              const value = event.target.value;

              setTitle(value);

              if (errors.title && value.trim() !== '') {
                setErrors(previous => ({ ...previous, title: false }));
              }
            }}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId === '' ? '' : String(selectedUserId)}
            onChange={event => {
              const value = event.target.value;

              setSelectedUserId(value === '' ? '' : Number(value));

              if (errors.user && value !== '') {
                setErrors(previous => ({ ...previous, user: false }));
              }
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(currentUser => (
              <option key={currentUser.id} value={currentUser.id}>
                {currentUser.name}
              </option>
            ))}
          </select>

          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};

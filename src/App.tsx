import { useState } from 'react';
import './App.scss';
import users from './api/users';
import todosFromServer from './api/todos';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

type Errors = {
  title: string;
  user: string;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [errors, setErrors] = useState<Errors>({ title: '', user: '' });

  const addTodo = () => {
    // Перевірка на наявність помилок
    let hasError = false;

    if (!title || !userId) {
      if (!title) {
        setErrors(prev => ({ ...prev, title: 'Please enter a title' }));
        hasError = true;
      }

      if (!userId) {
        setErrors(prev => ({ ...prev, user: 'Please choose a user' }));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hasError = true;
      }

      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      userId,
      completed: false,
      user: users.find(user => user.id === userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setErrors({ title: '', user: '' }); // Скидаємо помилки після додавання
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle.replace(/[^a-zA-Z0-9а-яА-ЯїЇєЄґҐіїІёЁ ]/g, ''));

    // Очищаємо помилку при зміні значення
    if (newTitle) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(event.target.value);

    setUserId(selectedUserId);

    // Очищаємо помилку при виборі користувача
    if (selectedUserId !== 0) {
      setErrors(prev => ({ ...prev, user: '' }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value={0} disabled={!!userId}>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.user && <span className="error">{errors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
              {todo.user?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};

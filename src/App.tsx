import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoInfoType, UserType } from './types';

// Example users and todos
const usersFromServer: UserType[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Patricia Lebsack',
    username: 'Karol',
    email: 'Julianne.OConner@kory.org',
  },
];

const todosFromServer: TodoInfoType[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    userId: 1,
    completed: true,
    user: usersFromServer[0],
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    userId: 2,
    completed: false,
    user: usersFromServer[1],
  },
];

export const App = () => {
  const [todos, setTodos] = useState<TodoInfoType[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [errors, setErrors] = useState({ title: '', user: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { title: '', user: '' };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
      valid = false;
    }

    if (!userId) {
      newErrors.user = 'Please choose a user';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    const selectedUser = usersFromServer.find(u => u.id === userId)!;
    const newTodo: TodoInfoType = {
      id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title,
      userId: userId as number,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Optional: only letters, digits, spaces
    const value = e.target.value.replace(/[^a-zA-Z0-9а-яА-ЯёЁ ]/g, '');

    setTitle(value);
    if (errors.title) {
      setErrors({ ...errors, title: '' });
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    if (errors.user) {
      setErrors({ ...errors, user: '' });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAdd}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
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

      <TodoList todos={todos} />
    </div>
  );
};

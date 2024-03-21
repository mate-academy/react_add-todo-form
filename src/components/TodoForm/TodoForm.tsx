import { useState } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

type Props = {
  users: User[];
  todoAdd: (newTodo: Todo) => void;
  newTodoId: number;
};

export const TodoForm: React.FC<Props> = ({ users, todoAdd, newTodoId }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const titleRegex = /^[a-zA-Zа-яА-Я0-9\s]*$/;

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const getUserById = (userId: number): User | null => {
    const result = users.find(user => user.id === userId);

    return result || null;
  };

  const handleTitleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (titleRegex.test(value)) {
      setTitle(value);
    }

    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId <= 0) {
      setUserIdError(true);
    }

    if (!title.trim() || userId <= 0) {
      return;
    }

    todoAdd({
      id: newTodoId,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    resetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
        </label>
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          {'User: '}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

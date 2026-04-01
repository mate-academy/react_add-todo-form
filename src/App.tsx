import './App.scss';
import { useMemo, useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const users = useMemo(() => usersFromServer as User[], []);

  const todosWithUsers = useMemo(
    () =>
      todos.map(todo => ({
        ...todo,
        user: todo.user ?? users.find(user => user.id === todo.userId),
      })),
    [todos, users],
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const [showErrors, setShowErrors] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const sanitizeTitle = (value: string) => {
    // allow Latin, Cyrillic, digits and spaces; remove everything else
    return value.replace(/[^^\p{Script=Latin}\p{Script=Cyrillic}\d ]+/gu, '');
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const cleaned = sanitizeTitle(raw);

    setTitle(cleaned);
    if (showErrors && titleError) {
      setTitleError('');
    }
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    if (showErrors && userError) {
      setUserError('');
    }
  };

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();
    setShowErrors(true);
    let valid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      valid = false;
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newId = maxId + 1;
    const userObj = users.find(
      user => String(user.id) === selectedUserId,
    ) as User;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: userObj.id,
      completed: false,
      // attach user object as required
      user: userObj,
    };

    setTodos(previousTodos => [...previousTodos, newTodo]);

    // clear form and errors
    setTitle('');
    setSelectedUserId('');
    setShowErrors(false);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onAdd} noValidate>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter todo title"
            data-cy="titleInput"
            value={title}
            onChange={onTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={onUserChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={String(user.id)}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
